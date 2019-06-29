import { useCallback, useEffect } from 'react';
import { useSpring } from 'react-spring/three';

/**
 * Gets the Normalized scroll postition
 * At the top of the scroll the value is 0
 * At the bottom of tht scroll the value is 1
 */
function getScrollPos() {
  return window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) || 0;
}

// The default spring settings.
// Any values can be overridden by those passed to the hook
const defaultConfig = {
  mass: 1, tension: 160, friction: 26, precision: .01
}

const useScrollSpring = (config) => {

  // merge the provided spring config with the default
  config = { ...defaultConfig, ...config };

  // Setup the spring with initial value set to the current scroll position
  const spring = useSpring(() => ({ scrollPos: getScrollPos(), config }));
  // eslint-disable-next-line no-unused-vars
  const [{ scrollPos }, set] = spring;

  // update the spring value as scrolling occurs
  const onScroll = useCallback(e => set({ scrollPos: getScrollPos() }), [set]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll]);

  return spring;
}

export default useScrollSpring;
