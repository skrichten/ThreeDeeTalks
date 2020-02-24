import React from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';

const Stage = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0; left: 0;
  overflow: hidden;
  z-index: 1;
`;

function ThreeCanvas({
  children,
  onCreated,
  className,
  ...props
}) {

  return (
    <Stage className={className}>
      <Canvas
        {...props}
        onCreated={onCreated}
      >
        {children}
      </Canvas>
    </Stage>
  );
}

export default ThreeCanvas;
