export function scrollTop (el, to, duration) {
  if (duration <= 0) return
  const diff = to - el.scrollTop
  const offset = diff / duration * 10

  setTimeout(() => {
    el.scrollTop = el.scrollTop + offset
    if (el.scrollTop === to) return
    scrollTop(el, to, duration - 5)
  }, 5)
}

export function scrollLeft (el, to, duration) {
  if (duration <= 0) return
  const diff = to - el.scrollLeft
  const offset = diff / duration * 10

  setTimeout(() => {
    el.scrollLeft = el.scrollLeft + offset
    if (el.scrollLeft === to) return
    scrollLeft(el, to, duration - 5)
  }, 5)
}
