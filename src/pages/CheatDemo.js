import React, { useRef } from 'react';
import {  useRender } from 'react-three-fiber';
import { animated as a , useSpring } from 'react-spring/three';
import GhostGeo from '../components/GhostGeo';

const CheatDemo = () => {

  const ghost = useRef();
  const group = useRef();

  const spring = useSpring({
    from: {pos: [1, .4, 0]},
    pos: [1, .6, 0],
    config: {
      mass: 1,
      tension: 10,
      friction: 0
    }
  })

  useRender(() => {
    group.current.rotation.y -= .01;
  })

  return (
      <group ref={group}>
        <a.object3D ref={ghost} position={spring.pos}>
          <GhostGeo />
        </a.object3D>
      </group>
  );

}

export default CheatDemo;
