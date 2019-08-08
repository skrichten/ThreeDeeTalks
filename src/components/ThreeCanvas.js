import React from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';

const Stage = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0; left: 0;
  overflow: hidden;
  z-index: -1;
`;

const glConfig = {
  gammaInput: true,
  gammaOutput: true,
  // physicallyCorrectLights: true
};

function ThreeCanvas({ children, ...props }) {

  return (
    <Stage>
      <Canvas
        gl={glConfig}
        {...props}
      >
        {children}
      </Canvas>
    </Stage>
  );
}

export default ThreeCanvas;
