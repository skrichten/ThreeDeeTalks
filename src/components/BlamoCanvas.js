import React from 'react';
import styled from 'styled-components';
import { FogExp2, Color } from 'three';
import { Canvas } from 'react-three-fiber';

const Stage = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: 1;
`;

const glConfig = {
  gammaInput: true,
  gammaOutput:true
};

const devicePixelRatio = window.devicePixelRatio.toFixed(1);

function Blamo(props) {


  const onCreated = ({ scene }) => {
    scene.background = new Color( 0x000000 );
    scene.fog = new FogExp2( 0x000000, .12 );
  }

  return (
    <Stage>
      <Canvas gl={glConfig} pixelRatio={devicePixelRatio} onCreated={onCreated} >
        {props.children}
      </Canvas>
    </Stage>
  );
}

export default Blamo;
