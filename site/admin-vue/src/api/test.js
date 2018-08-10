import axios from '@/libs/axios.js'

export const test = ({p1, p2}) => {
  const data = {
    p1, p2
  }
  return axios.request({
    url: '/mock/test',
    data,
    method: 'post'
  })
}
