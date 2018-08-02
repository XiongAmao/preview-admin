(function() {
  var iframeWindow = document.querySelector('#iframe-window')
  var testBtn = document.querySelector('.test')
  var windowHash = window.location.hash
  var iframeSrc = windowHash.split('#')[1]

  iframeWindow.src = iframeSrc.replace('?', '#')

  iframeWindow.onload = function() {

    var $artboardList = Array.from(iframeWindow.contentDocument.querySelectorAll('.artboard'))

    $artboardList.forEach(e => {
      on(e, 'click', e => {
        var hash = 'artboard' + e.currentTarget.getAttribute('data-index')
        windowHash = replaceHash(windowHash, hash)
        window.history.replaceState(null, null, windowHash)
      })
    })
  }
  // TODO: encodeURIComponent() encodeURI()
  // https://www.npmjs.com/package/js-base64
  function replaceHash(oriHash, hash) {
    if (oriHash.indexOf('?') !== -1) {
      return oriHash.replace(/\?.+/, '?' + hash)
    }
    return oriHash + '?' + hash
  }
  function on(element, event, fn) {
    element.addEventListener(event, fn)
  }
})()

