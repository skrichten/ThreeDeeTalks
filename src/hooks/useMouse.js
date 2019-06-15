import { useCallback, useEffect } from 'react';
import { useSpring } from 'react-spring/three';


const useMouse = (config) => {
  const defaultConfig = {
    mass: 1, tension: 160, friction: 26, precision: .01
  }
  config = { ...defaultConfig, ...config };

  const spring = useSpring(() => ({ mouse: [0,0], config }));
  const [{ mouse }, set] = spring;

  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    set({ mouse: [ x / window.innerWidth, y / window.innerHeight ] });
    //set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] });
    //console.log(x / window.innerWidth, y / window.innerHeight );
  }, []);


  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove)
  },  [onMouseMove]);

  return spring;
}

export default useMouse;



