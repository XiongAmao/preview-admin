const path = require('path')
const bodyParser = require('body-parser')
const pathToRegexp = require('path-to-regexp')
const chokidar = require('chokidar')
const parse = require('url').parse

let proxyList = {}

// handle path params
function pathMatch (path) {
  const options = {
    sensitive: false,
    strict: false,
    end: false
  }
  let keys = []
  let re = pathToRegexp(path, keys, options)
  return function (pathname, params = {}) {
    var m = re.exec(pathname)
    if (!m) return false
    var key, param
    for (var i = 0; i < keys.length; i++) {
      key = keys[i]
      param = m[i + 1]
      if (!param) continue
      params[key.name] = decodeURIComponent(param)
      if (key.repeat) params[key.name] = params[key.name].split(key.delimiter)
    }
    return params
  }
}

/**
 * @param {string} entryPath mock配置文件入口，监听入口文件及同目录下所有文件，保证热重载mock配置文件
 * @param {obj} app
 * @returns void
 */
module.exports = function (entryPath, app) {
  const entryDirPath = path.dirname(entryPath)
  proxyList = require(entryPath)
  // watch mock DIR
  var watcher = chokidar.watch(entryDirPath)
  watcher.on('all', (event, path) => {
    if (path === __filename) return
    // change文件 add文件时的处理方式不同
    if (event === 'change') {
      try {
        cleanCacheWhenChange(path, entryPath)
        proxyList = require(entryPath)
      } catch (err) {}
    }
    if (event === 'add') {
      try {
        cleanCacheWhenAdd(entryPath)
        proxyList = require(entryPath)
      } catch (err) {}
    }
  })

  // handle request
  app.all('/*', function (req, res, next) {
    const reqURL = `${req.method} ${req.path}`
    const containMockURL = Object.keys(proxyList).filter(function (kname) {
      const mockURL = kname.split(' ')
      if (mockURL && mockURL.length === 2 && mockURL[0] === req.method) {
        return !!pathMatch(mockURL[1])(parse(req.url).pathname) // if has params
      } else {
        return false
      }
    })
    if (proxyList[reqURL] || (containMockURL && containMockURL.length > 0)) {
      let bodyParseMethod = bodyParser.json()
      const contentType = req.get('Content-Type')
      if (contentType === 'text/plain') {
        bodyParseMethod = bodyParser.raw({ type: 'text/plain' })
      }
      bodyParseMethod(req, res, function () {
        const mockData = proxyList[reqURL] || proxyList[containMockURL[0]]
        if (typeof mockData === 'function') {
          //  inject path params to req
          if (containMockURL[0]) {
            const mockURL = containMockURL[0].split(' ')
            if (mockURL && mockURL.length === 2 && req.method === mockURL[0]) {
              const getParams = pathMatch(mockURL[1])
              req.params = getParams(parse(req.url).pathname)
            }
          }
          mockData(req, res, next)
        } else {
          res.json(mockData)
        }
      })
    } else {
      next()
    }
  })

  function cleanCacheWhenAdd (entryPath) {
    const nodeList = []

    getChildrenModuleName(entryPath)
    // 处理所有子项
    nodeList.forEach(filename => cleanCache(filename))
    // 处理入口文件
    cleanCache(entryPath, true)

    function getChildrenModuleName (path) {
      const module = require.cache[path]

      if (!module) return

      if (path !== entryPath) {
        nodeList.push(module.filename)
      }

      module.children.forEach(m => getChildrenModuleName(m.filename))
    }
  }

  function cleanCacheWhenChange (targetPath, entryPath) {
    const pathModule = require.cache[targetPath]
    const nodeList = []
    let hasReference = false

    if (!pathModule) return

    if (targetPath === entryPath) {
      cleanCache(targetPath)
    } else {
      // 递归从更新的文件开始找父引用直到找到入口文件
      checkParentModule(targetPath)
      // 如果找到入口文件，则清理该链路上的缓存
      if (hasReference) {
        nodeList.forEach(path => cleanCache(path))
        cleanCache(entryPath, true)
      }
    }

    function checkParentModule (path) {
      const module = require.cache[path]
      if (module && module.parent) {
        const parent = module.parent

        if (module.filename === entryPath) {
          hasReference = true
        } else {
          nodeList.push(path)
          return checkParentModule(parent.filename)
        }
      }
    }
  }

  function cleanCache (path, cleanParent = false) {
    var module = require.cache[path]
    if (!module) return
    if (cleanParent) {
      const parent = module.parent
      if (parent) {
        parent.children.splice(parent.children.indexOf(module), 1)
      }
    }
    require.cache[path] = null
  }

  return function (req, res, next) {
    next()
  }
}
