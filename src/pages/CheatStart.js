import React, { useRef } from 'react';
import { useRender } from 'react-three-fiber';
import GhostMesh from '../components/GhostMesh';

const CheatDemo = () => {

  // Allows us to reference the 3D object as "ghost.current"
  const ghost = useRef();

  /**
   * This hook, provided by react-three-fiber, allows us to run code
   * in the internal render loop (requestAnimationFrame)
   */
  useRender(() => {

  })

  return (
    <object3D ref={ghost} >
      <GhostMesh />
    </object3D>
  );

}

export default CheatDemo;
