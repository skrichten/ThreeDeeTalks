import React, { useRef } from 'react';
import {  useRender } from 'react-three-fiber';

import GhostGeo from '../components/GhostGeo';

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
    <mesh ref={ghost} position={[0, 0, 0]}>
      <GhostGeo />
    </mesh>
  );

}

export default CheatDemo;
