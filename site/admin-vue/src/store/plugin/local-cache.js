import LocalStorage from '@/libs/local-storage'

/**
 * @description Vuex数据持久化plugin, 用于处理页面的刷新
 * @param {Array}     mutations           -  配置列表
 * @param {Object}    mutations[]         -  配置的单个mutation 对象形式{ type: '' }
 * @param {String}    mutations[].type    -  单个mutation的type
 */
export default function (mutations = []) {
  return (store) => {
    if (!mutations) return

    // 当页面刷新时，先重新拉一次Storage
    // 经过测试，Vuex plugin 的执行优先于 Vue router的beforeEach 钩子，因此可以通过该插件处理页面刷新时路由鉴权的问题

    mutations.forEach((mutation) => {
      // 当判断条件不通过时，这个mutation不随页面刷新重新拉取
      if (!mutation.check) return

      const payload = LocalStorage.getItem(mutation.type)

      if (payload) {
        store.commit(mutation.type, payload)
      }
    })

    // 每次commit时触发，当匹配到配置过的type时，会将这次的state存到Storage
    store.subscribe((commit, state) => {
      mutations.forEach((mutation) => {
        if (commit.type === mutation.type) {
          LocalStorage.setItem(commit.type, commit.payload)
        }
      })
    })
  }
}
