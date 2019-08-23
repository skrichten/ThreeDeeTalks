import { useCallback } from 'react';
import { useSpring } from 'react-spring';

// The default spring settings.
// Any values can be overridden by those passed to the hook
const defaultConfig = {
  mass: 1, tension: 160, friction: 26, precision: .01
}

/**
 * Gets the normalized mouse position as the mouse moves
 */
const useMouseSpring = (config, centered) => {

  // merge the provided spring config with the default
  config = { ...defaultConfig, ...config };

  const spring = useSpring(() => ({ mouse: [0,0], config }));
  // eslint-disable-next-line no-unused-vars
  const [{ mouse }, set] = spring;

  // TODO: make this based on canvas size instead of window?
  const mouseMoveHandler = useCallback(({target:element, clientX: x, clientY: y, nativeEvent }) => {
    if (centered) {
      const {offsetX: x, offsetY: y} = nativeEvent;
      const hx = element.clientWidth / 2;
      const hy = element.clientHeight / 2;
      set({ mouse: [(x - hx) / hx, (y - hy) / hy] });
    } else {
      set({ mouse: [x / element.clientWidth, y / element.clientHeight] });
    }
  }, [set, centered]);


  return { spring, mouseMoveHandler };
}

export default useMouseSpring;
