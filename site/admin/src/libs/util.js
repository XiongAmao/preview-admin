import { Base64 } from 'js-base64'
import queryString from 'query-string'

export const decode = (val) => {
  return Base64.decode(val)
}

export const encode = (val) => {
  return Base64.encodeURI(val)
}

export const on = (element, event, fn) => {
  element.addEventListener(event, fn)
}

export const getQueryObj = (path) => {
  return queryString.parse(path)
}
