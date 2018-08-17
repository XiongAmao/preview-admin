/**
 * @namespace
 * @prop {array} username      - 用户名为key，value为token数组
 */
const tokenCacheList = {
  // some-username: [...tokens]
}

const removeTokenCache = (username, token) => {
  if (!(username in tokenCacheList)) return null
  if (token === 'all') {
    tokenCacheList[username] = []
    return null
  }
  const tokenList = tokenCacheList[username]
  tokenCacheList[username] = tokenList.map(t => {
    return t !== token
  })
}

const getTokenCache = (username, token) => {
  if (!(username in tokenCacheList)) return null
  const list = tokenCacheList[username]
  for (let i = list.length - 1; i > -1; i--) {
    if (list[i] === token) {
      return token
    }
    if (i === 0) return null
  }
  return null
}

const addTokenCache = (username, token) => {
  try {
    if (!(username in tokenCacheList)) {
      tokenCacheList[username] = [token]
      return true
    }
    const hasToken = tokenCacheList[username].some(t => {
      return t === token
    })
    if (!hasToken) {
      tokenCacheList[username].push(token)
    }
  } catch (err) {
    return err
  }
}

module.exports = {
  removeTokenCache,
  getTokenCache,
  addTokenCache
}
