import React, { useRef, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Vector3 } from 'three';
import { animated as a } from 'react-spring/three';
import Content from '../Team/Content';
import useMouseSpring from '../../hooks/useMouseSpring';

const mapRange = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

/**
 * Z value for camera projection used to map screen position to 3D position
 * Not sure how to calculate this value, found it by trial and error.
 * It is influenced by camera near/far range.
 */
const zPlane = .995
// offset the position of the content from the top of the tracked element.
const yOffset = 9.7

const TeamIntegrated = ({ trackElement }) => {
  const [show, setShow] = useState(false)
  const groupRef = useRef();
  const lastTop = useRef();
  const { size } = useThree();

  // The useMouseSpring hook will provide the current normalized mouse postion
  // as a react-spring AnimatedValue
  const [{mouse}] = useMouseSpring({precision: .001, mass: 1, tension:120});

  // Setup an animated rotation from the useMouseSpring AnimatedValue
  // This will make the content rotate on the x and y axis based on the mouse position
  const mouseRot = mouse.interpolate((x, y) => [
    y === 0 ? 0 : (-1 * y)+.5,
    x === 0 ? 0 : (-1.4 * x)+.7,
    0
  ]);

  useFrame(({ camera }) => {
    if (!trackElement) return;

    const {top, bottom} = trackElement.getBoundingClientRect();
    const isOffscreen = bottom < 0 || top > size.height;

    setShow(!isOffscreen);

    // If position hasn't changed or the tracked element is off screen, we do nothing
    if (isOffscreen || top === lastTop.current) return;

    lastTop.current = top;
    // Map top value to -1 to 1 range for use in 3D camera projection.
    const adjustedTop = mapRange(top, 0, size.height, -1, 1) * -1;
    const newVec = new Vector3( 0, adjustedTop, zPlane ).unproject( camera );
    /*
     position the content based on the projection, needs to be offset since position
     of 3D object is based on the center and the coords are based on the top of the tracked element.
     */
    groupRef.current.position.y = newVec.y - yOffset;
  });

  return (
    show
      ?<a.group rotation={mouseRot} ref={groupRef}>
        <Content scale={[4.5, 4.5, 4.5]} />
      </a.group>
      : null
  )
};

export default TeamIntegrated;

