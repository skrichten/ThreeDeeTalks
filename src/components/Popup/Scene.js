import React, { useRef } from 'react';
import { animated as a } from 'react-spring/three';
import useScrollSpring from '../../hooks/useScrollSpring';
import PopMesh from './PopMesh';
import GroundPlane from '../GroundPlane';

const isGreater = (a, b) => a > b;
const isLess = (a, b) => a < b;

export default function Scene({ scrollBounds, ...props}) {
  const group = useRef();
  const wellRef = useRef();
  const houseRef = useRef();
  const archRef = useRef();
  const triggerTimes = useRef([
    {
      ref: houseRef,
      time: .1
    },
    {
      ref: wellRef,
      time: .15
    },
    {
      ref: archRef,
      time: .2
    }
  ]);

  const [[{scrollPos}], direction] = useScrollSpring();
  console.log(direction);

  const scrollMove = scrollPos.interpolate(y => {
    let pos = Math.max(y - scrollBounds[0], 0);
    pos = Math.min(pos, scrollBounds[1] - scrollBounds[0]);
    const op = direction === 'down' ? isGreater : isLess;

    // Compare current scroll position with each trigger time
    // And call play() if applicable
    triggerTimes.current.forEach((t => {
      if ( t.ref.current && op(pos, t.time) ) t.ref.current.play();
    }))

    console.log(pos)

    return [
      0,
      0,
      pos * 10,
    ]
  });

  return (
    <group>
      <a.group ref={group} {...props} dispose={null} position={scrollMove} >
        <PopMesh
          ref={houseRef}
          prefix="House"
          path="/house.glb"
          position={[-1.5, 0, -5]}
          rotation-y={.1}
          direction={direction === 'down' ? 1 : -1}
          flip
        />
        <PopMesh
          ref={wellRef}
          prefix="Well"
          path="/well.glb"
          position={[1, -.03, -5]}
          rotation-y={.5}
          direction={direction === 'down' ? 1 : -1}
        />
        <PopMesh
          ref={archRef}
          prefix="Arch"
          path="/arch.glb"
          position={[0, -.03, -6]}
          direction={direction === 'down' ? 1 : -1}
        />
      </a.group>
      <GroundPlane position-y={.07} />
    </group>
  )

}
