const fs = require('fs')
const glob = require('glob')

const checkPathExists = (path) => {
  const exist = fs.existsSync(path)
  if (!exist) {
    // TODO: colorful!!
    throw new Error(`
      Cant' find static directory: ${path}
      please set path in config/index.js
    `)
  } else {
    return true
  }
}

// 获取rp/skecth本地的资源地址，构造一个储存相关信息的数组
const getPreviewList = (entryPath) => {
  const result = glob.sync(entryPath + '/**/index.html')
  if (result.length === 0) {
    console.log('Rp static doesn\'t exist.')
    return []
  }
  const previewList = result.map(path => {
    const urlPath = path.replace(entryPath, '') // 资源url入口
    const dirPath = urlPath.replace('/index.html', '') // 目录路径
    const dirList = dirPath.split('/') // ['', '项目', '子项目']

    // 现在定成2级目录，如果要分层，需要再加一层目录或者文件夹，以rp文件夹为准
    if (dirList.length !== 3) return undefined

    const projectName = dirList[1]
    const subName = dirList[2]
    const item = {
      path: urlPath,
      projectName,
      subName
    }
    return item
  }).filter(e => e)

  return previewList
}

const createJTI = () => {
  var s = []
  var hexDigits = '0123456789abcdefghijklmnopqrstuvwxyz'
  for (var i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 36), 1)
  }
  return s.join('')
}

module.exports = {
  checkPathExists,
  getPreviewList,
  createJTI
}
