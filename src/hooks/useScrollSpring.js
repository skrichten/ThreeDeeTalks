import { useCallback, useEffect, useRef, useState } from 'react';
import { useSpring } from 'react-spring/three';

/**
 * Gets the Normalized scroll postition
 * At the top of the scroll the value is 0
 * At the bottom of tht scroll the value is 1
 */
export function getScrollPos(normalize) {
  if (typeof window === 'undefined') return 0;

  return normalize
    ? window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) || 0
    : window.pageYOffset || 0;
}

function getDirection(pos, lastPos) {
  if (pos > lastPos) return 'down';
  if (pos < lastPos) return 'up';
  return null;
}

// The default spring settings.
// Any values can be overridden by those passed to the hook
const defaultConfig = {
  mass: 1, tension: 160, friction: 26, precision: .01
}

const useScrollSpring = (config, normalize = true) => {
  // merge the provided spring config with the default
  config = { ...defaultConfig, ...config };

  const lastPos = useRef(getScrollPos(normalize));

  // Setup the spring with initial value set to the current scroll position
  const spring = useSpring(() => ({ scrollPos: lastPos.current, config }));
  // eslint-disable-next-line no-unused-vars
  const [_, set] = spring;
  const [direction, setDirection] = useState(null)

  // update the spring value as scrolling occurs
  const onScroll = useCallback(e => {
    const newPos = getScrollPos(normalize);
    const dir = getDirection(newPos, lastPos.current);
    set({ scrollPos: newPos })
    setDirection(dir);
    lastPos.current = newPos;
  }, [set, normalize]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll]);

  return [spring, direction];
}

export default useScrollSpring;
