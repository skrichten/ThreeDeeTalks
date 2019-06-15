import React, { useRef } from 'react';
import {  useRender } from 'react-three-fiber';
import { animated as a , useSpring } from 'react-spring/three';
import GhostMesh from './GhostMesh';

const GhostAnimation = () => {

  const ghost = useRef();
  const group = useRef();

  const spring = useSpring({
    from: {pos: [2, .4, 0]},
    pos: [2, .6, 0],
    config: {
      mass: 1,
      tension: 10,
      friction: 0
    }
  })

  useRender(() => {
    if (!group || !group.current) return;
    group.current.rotation.y -= .007;
  })

  // Here is how you might do this with a more Math oriented approach...
  /*
  let t = 0;
  useRender(() => {
    t += .01;
    ghost.current.position.x = Math.sin(t);
    ghost.current.position.z = -Math.cos(t);
    ghost.current.position.y = (Math.cos(t*2) +1) * .5;
  })
  */

  return (
      <group ref={group}>
        <a.object3D ref={ghost} position={spring.pos}>
          <GhostMesh />
        </a.object3D>
      </group>
  );

}

export default GhostAnimation;
