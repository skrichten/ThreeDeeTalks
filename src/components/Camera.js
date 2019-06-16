import React, { useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { animated as a } from 'react-spring/three';
import useScrollPos from '../hooks/useScrollPos';

function Camera() {
  const camera = useRef();
  const { setDefaultCamera } = useThree();
  useEffect(() => void setDefaultCamera(camera.current), []);

  const [{scrollPos}] = useScrollPos();
  const interpPos = scrollPos.interpolate(y => {
    return [0, 0, (Math.sin(y*3.14) * 2.5) + 5.3]
  })

  return <a.perspectiveCamera ref={camera} fov={60} position={interpPos} />
}

export default Camera
