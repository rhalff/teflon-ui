export function createElement(html) {
  const div = document.createElement('div')
  div.innerHTML = html

  return div
}

export function click(el) {
  const ev = document.createEvent('MouseEvents')
  ev.initMouseEvent( /* deprecated but works */
    'click',
    true, true,
    document.defaultView,
    0, 0, 0, 0, 0,
    false, false, false,
    0,
    null, null
  )
  el.dispatchEvent(ev)
}

