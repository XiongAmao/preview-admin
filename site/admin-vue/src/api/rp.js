import Axios from '@/libs/axios.js'

export const getRpList = () => {
  return Axios.request({
    url: '/api/rp/list',
    method: 'get'
  })
}

export default {
  getRpList
}
