import { useCallback, useEffect, useRef } from 'react';

/**
 * Gets the Normalized scroll postition
 * At the top of the scroll the value is 0
 * At the bottom of tht scroll the value is 1
 */
function getScrollPos() {
  if (typeof window === 'undefined') return 0;

  return window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) || 0;
}

function getDirection(pos, lastPos) {
  if (pos > lastPos) return 'down';
  if (pos < lastPos) return 'up';
  return null;
}

const useScrollPos = (listener) => {
  const lastPos = useRef(getScrollPos());
  //const direction = useRef(null);
  //const scrollPos = useRef(0);

  // update the values as scrolling occurs
  const onScroll = useCallback(e => {
    const newPos = getScrollPos();
    listener(newPos, getDirection(newPos, lastPos.current));
    //direction.current = getDirection(newPos, lastPos.current);
    //scrollPos.current = newPos;
    lastPos.current = newPos;
  });

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll]);

  //return [scrollPos, direction];
  return;
}

export default useScrollPos;
