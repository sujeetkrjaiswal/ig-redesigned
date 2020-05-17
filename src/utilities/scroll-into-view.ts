export const moveToId = (selector: string) => {
  try {
    const offset = selector ? (document.querySelector(selector) as HTMLElement).offsetTop : 0
    const scrollingView = document.querySelector('#app-content')
    if (scrollingView) {
      scrollingView.scrollTop = offset
    }
  } catch (e) {}
}
