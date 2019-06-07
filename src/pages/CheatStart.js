import React, { useRef } from 'react';
import {  useRender } from 'react-three-fiber';
import GhostGeo from '../components/GhostGeo';

const CheatDemo = () => {

  const ghost = useRef();



  useRender(() => {

  })

  return (
    <mesh ref={ghost} position={[0, 0, 0]} >
      <GhostGeo />
    </mesh>
  );

}

export default CheatDemo;
