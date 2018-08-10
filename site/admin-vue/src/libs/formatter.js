export const AmountFormat = (amount, unit = 1) => {
  if (!amount) return `￥0`

  let string = (amount * unit).toString()

  var arr = string.split('.')

  if (arr.length > 1) {
    let right = arr[1].slice(0, 2)
    return `￥${arr[0]}.${right}`
  } else {
    return `￥${arr[0]}.00`
  }
}

export const DateFormat = (date, format = 'yyyy-MM-dd') => {
  if (!date) {
    return ''
  }

  if (!/[\u002d\u003a\u007e\u0020]/.test(date)) {
    date = Number(date)
  }

  date = new Date(date)

  let map = {
    'M': date.getMonth() + 1, // 月份
    'd': date.getDate(), // 日
    'h': date.getHours(), // 小时
    'm': date.getMinutes(), // 分
    's': date.getSeconds(), // 秒
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }

  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    let v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })

  return format
}
