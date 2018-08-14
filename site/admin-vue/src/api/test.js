import axios from '@/libs/axios.js'

export const getIframe = () => {
  return axios.request({
    url: '/rp/some-project/1.1/project/index.html',
    method: 'get'
  })
}

export default {
  getIframe
}
