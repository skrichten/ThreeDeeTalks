import { useCallback, useEffect } from 'react';


/**
 * Gets the Normalized scroll postition
 * At the top of the scroll the value is 0
 * At the bottom of tht scroll the value is 1
 */
function getScrollPos() {
  return window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) || 0;
}

const useScrollPos = () => {
  const [scrollPos, set] = useState(0);

  // update the spring value as scrolling occurs
  const onScroll = useCallback(e => set( getScrollPos() ), [set]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll]);

  return scrollPos;
}

export default useScrollPos;
