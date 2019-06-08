import React, { useRef } from 'react';
import {  useRender } from 'react-three-fiber';

import GhostMesh from '../components/GhostMesh';

const CheatDemo = () => {

  const ghost = useRef();


  let t = 0;
  useRender(() => {
    t += .01;
    ghost.current.position.x = Math.sin(t);
    ghost.current.position.z = -Math.cos(t);
    ghost.current.position.y = (Math.cos(t*2) +1) * .5;
  })

  return (
    <object3D ref={ghost}>
      <GhostMesh />
    </object3D>
  );

}

export default CheatDemo;
