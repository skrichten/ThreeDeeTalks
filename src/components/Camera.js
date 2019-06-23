import React, { useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { animated as a } from 'react-spring/three';
import useScrollPos from '../hooks/useScrollPos';

function Camera({children, startDist}) {
  const camera = useRef();
  const { setDefaultCamera } = useThree();
  useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera]);

  const [{scrollPos}] = useScrollPos();
  const interpPos = scrollPos.interpolate(y => {
    return [0, 0, (Math.sin(y*3.14) * 6) + startDist]
  })

  return (
    <a.perspectiveCamera ref={camera} fov={65} position={interpPos}>
      {children}}
    </a.perspectiveCamera>
  )

}

export default Camera
