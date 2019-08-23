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
const useMouseSpring = (config, element = window) => {
  if (element === null) element = window;

  // merge the provided spring config with the default
  config = { ...defaultConfig, ...config };

  const spring = useSpring(() => ({ mouse: [0,0], config }));
  // eslint-disable-next-line no-unused-vars
  const [{ mouse }, set] = spring;

  // TODO: make this based on canvas size instead of window?
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    const m = (element === window) ?
    [ x / window.innerWidth, y / window.innerHeight ]
    :
    [ x / element.clientWidth, y / element.clientHeight ];
    set({ mouse: m });
  }, [set, element]);


  useEffect(() => {
    element.addEventListener('mousemove', onMouseMove);
    return () => element.removeEventListener('mousemove', onMouseMove)
  },  [onMouseMove, element]);

  return spring;
}

export default useMouseSpring;
