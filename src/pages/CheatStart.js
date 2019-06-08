import React, { useRef } from 'react';
import {  useRender } from 'react-three-fiber';
import GhostMesh from '../components/GhostMesh';

const CheatDemo = () => {

  const ghost = useRef();

  useRender(() => {

  })

  return (
    <object3D ref={ghost} >
      <GhostMesh />
    </object3D>
  );

}

export default CheatDemo;
