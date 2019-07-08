import React, { useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { animated as a } from 'react-spring/three';
import useMouseSpring from '../hooks/useMouseSpring';

function BlamoCam() {
  const camera = useRef();
  const { setDefaultCamera } = useThree();
  useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera]);

  const [{mouse}] = useMouseSpring({precision: .001, mass: 1, tension:120});
  console.log(mouse)

  // if mouse position is 0 there probably is no mouse
  const mouseRot = mouse.interpolate((x, y) => [
    y === 0 ? 0 : (-.2 * y)+.1,
    x === 0 ? 0 : (-.2 * x)+.1,
    0
  ]);

  return (
    <a.perspectiveCamera ref={camera} fov={65} rotation={mouseRot} position={[ 0, 0, 5]} />
  )

}

export default BlamoCam
