import React, { useRef } from 'react';
import {  useRender } from 'react-three-fiber';
import GhostGeo from '../components/GhostGeo';

const CheatDemo = () => {

  const ghost = useRef();

  useRender(() => {

  })

  return (
    <object3D ref={ghost} >
      <GhostGeo />
    </object3D>
  );

}

export default CheatDemo;
