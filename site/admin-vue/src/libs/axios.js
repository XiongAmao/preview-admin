import Axios from 'axios'
import { Message } from 'iview'
import BASE_URL from '__conf/url'
import store from '@/store'
import router from '@/router'
import { CreateRequestId } from '@/libs/utils.js'

class HttpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }

    this.queue = {}
  }

  destory (url) {
    delete this.queue[url]
    return Object.keys(this.queue).length
  }

  interceptors (instance, url) {
    // request
    instance.interceptors.request.use((config) => {
      // 每次请求reset Request-Id
      config.headers['Request-Id'] = CreateRequestId()

      // set token
      const token = store.state.user.token
      if (token) {
        config.headers.Authorization = token
      }

      return config
    }, (error) => {
      return Promise.reject(error)
    })

    // response
    instance.interceptors.response.use((response) => {
      let { data } = response
      const is = this.destory(url)

      if (!is) {

      }

      return data
    }, (error) => {
      const res = error.response
      const errMsg = error.message

      if (res) {
        // 登录超时
        if (res.status === 401) {
          store.dispatch('user/handleLoginExpired')
          Message.error('未登录，或登录状态已失效')
          router.push({
            name: 'login'
          })
        } else {
          // 服务端返回的错误信息
          if (res.data && res.data.msg) {
            Message.error(res.data.msg)
          }
        }
      } else if (typeof errMsg === 'string') {
        if (errMsg === 'Network Error') {
          Message.error('网络错误，请检查网络是否正常')
        } else if (errMsg.search('timeout') !== -1) {
          Message.error('请求超时')
        }
      } else {
        Message.error('服务器遇到了一个错误')
      }

      return Promise.reject(error)
    })
  }

  create () {
    const config = {
      baseURL: BASE_URL,
      timeout: 1000 * 10,
      headers: {
        'Request-Id': CreateRequestId()
      }
    }
    return Axios.create(config)
  }

  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
const axios = new HttpRequest()

export default axios
