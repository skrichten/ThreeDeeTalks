import { useCallback, useEffect } from 'react';
import { useSpring } from 'react-spring/three';

/**
 * Gets the Normalized scroll postition
 * At the top of the scroll the value is 0
 * At the bottom of tht scroll the value is 1
 */
function getScrollPos(normalize) {
  let pos = window.pageYOffset || 0;
  if (normalize) {
    pos = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) || 0;
  }
  return pos;
}

// The default spring settings.
// Any values can be overridden by those passed to the hook
const defaultConfig = {
  mass: 1, tension: 160, friction: 26, precision: .01
}

const useScrollSpring = (config, normalize = true) => {
  // merge the provided spring config with the default
  config = { ...defaultConfig, ...config };

  // Setup the spring with initial value set to the current scroll position
  const spring = useSpring(() => ({ scrollPos: getScrollPos(normalize), config }));
  // eslint-disable-next-line no-unused-vars
  const [{ scrollPos }, set] = spring;

  // update the spring value as scrolling occurs
  const onScroll = useCallback(e => set({ scrollPos: getScrollPos(normalize) }), [set, normalize]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll]);

  return spring;
}

export default useScrollSpring;
