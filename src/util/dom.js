export const getScrollHeight = () => Math.max(
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight,
  document.documentElement.clientHeight
);
