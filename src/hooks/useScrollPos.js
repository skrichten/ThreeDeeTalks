import { useCallback, useEffect } from 'react';
import { useSpring } from 'react-spring/three';

function getScrollPos() {
  return window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) || 0;
}

const useScrollPos = (config) => {
  const defaultConfig = {
    mass: 1, tension: 160, friction: 26, precision: .01
  }
  config = { ...defaultConfig, ...config };

  const spring = useSpring(() => ({ scrollPos: getScrollPos(), config }));
  const [{ scrollPos }, set] = spring;

  const onScroll = useCallback(e => set({ scrollPos: getScrollPos() }), [set]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll]);

  return spring;
}

export default useScrollPos;
