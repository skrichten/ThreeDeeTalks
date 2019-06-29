import { useCallback, useEffect } from 'react';
import { useSpring } from 'react-spring/three';

// The default spring settings.
// Any values can be overridden by those passed to the hook
const defaultConfig = {
  mass: 1, tension: 160, friction: 26, precision: .01
}

/**
 * Gets the normalized mouse position as the mouse moves
 */
const useMouseSpring = (config) => {

  // merge the provided spring config with the default
  config = { ...defaultConfig, ...config };

  const spring = useSpring(() => ({ mouse: [0,0], config }));
  // eslint-disable-next-line no-unused-vars
  const [{ mouse }, set] = spring;

  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    set({ mouse: [ x / window.innerWidth, y / window.innerHeight ] });
  }, [set]);


  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove)
  },  [onMouseMove]);

  return spring;
}

export default useMouseSpring;
