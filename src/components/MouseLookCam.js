import React, { useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { animated as a } from 'react-spring/three.cjs';
import useMouseSpring from '../hooks/useMouseSpring';

const springConfig = { precision: 0.001, mass: 1, tension: 120 };

function MouseLookCam({ children, ...props }) {
  const camera = useRef();
  const { setDefaultCamera } = useThree();

  useEffect(() => setDefaultCamera(camera.current), [setDefaultCamera]);

  const [{ mouse }] = useMouseSpring(springConfig);

  const mouseXRot = mouse.interpolate((x, y) => (-1 * y) + 0.5);
  const mouseYRot = mouse.interpolate(x => (-2 * x) + 1);

  return (
    <a.group {...props} rotation-y={mouseYRot} position-y={2} >
      <a.perspectiveCamera position={[0, 0, 0]} ref={camera} fov={65} rotation-x={mouseXRot}>
        {children}
      </a.perspectiveCamera>
    </a.group>
  );
}

export default MouseLookCam;
