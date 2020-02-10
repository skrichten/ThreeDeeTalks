import { useCallback, useEffect } from 'react';
import { useSpring } from 'react-spring/three.cjs';

// The default spring settings.
// Any values can be overridden by those passed to the hook
const defaultConfig = {
  mass: 1, tension: 160, friction: 26, precision: 0.01,
};

/**
 * Gets the normalized mouse position as the mouse moves
 */
const useMouseSpring = (config, centered) => {

  // merge the provided spring config with the default
  const mconfig = { ...defaultConfig, ...config };

  const spring = useSpring(() => ({ mouse: [
    (window.innerWidth / 2) / window.innerWidth,
    (window.innerHeight / 2) / window.innerHeight,
  ],
  config: mconfig }));

  // eslint-disable-next-line no-unused-vars
  const [, set] = spring;

  // TODO: make this based on canvas size instead of window?
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    if (centered) {
      const hx = window.innerWidth / 2;
      const hy = window.innerHeight / 2;

      set({ mouse: [(x - hx) / hx, (y - hy) / hy] });
    } else {
      set({ mouse: [x / window.innerWidth, y / window.innerHeight] });
    }

  }, [set, centered]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  return spring;
};

export default useMouseSpring;
