import React, { useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { animated as a } from 'react-spring/three';
import useScrollPos from '../hooks/useScrollSpring';

function Camera({ startDist }) {
  const camera = useRef();
  const { setDefaultCamera } = useThree();
  useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera]);

  const [[{scrollPos}]] = useScrollPos();

  // Moves the camera away from the starting point and then back towards it (Math.sin)
  const interpPos = scrollPos.interpolate(y => {
    return [0, 0, (Math.sin(y*3.14) * 6) + startDist]
  })

  return (
    <a.perspectiveCamera ref={camera} fov={65} position={interpPos} />
  )

}

export default Camera
