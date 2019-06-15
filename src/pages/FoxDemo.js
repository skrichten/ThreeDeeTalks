import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';
import Fox from '../components/Fox';
import useScrollPos from '../hooks/useScrollPos';
import useMouse from '../hooks/useMouse';
import { animated as a } from 'react-spring/three';


const Spacer = styled.div`
  height: 2500px;
`;

const Stage = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  overflow: hidden;
`;

const glConfig = {
  gammaInput: true,
  gammaOutput:true,
  gammaFactor: 2.2,
  premultipliedAlpha: false
};

const cameraConfig = {
  position: [0, 0, 5],
  rotation: [ 0, 0, 0]
};


function FoxDemo() {
  const [{scrollPos}] = useScrollPos({ precision: .001, friction:10 });
  const [{mouse}] = useMouse({precision: .001, mass: 1, tension:120});
  const interpRot = mouse.interpolate((x, y) => [(.04 * y)-.02, (.04 * x)-.02, 0]);

  return (
    <main>
      <Stage>
        <Canvas gl={glConfig} camera={cameraConfig} >
          <a.group rotation = {interpRot} >
            <Fox
              scale={[2.5, 2.5, 2.5]}
              rotation={[0, -.4, 0]}
              position={[.4, -.5, 2]}
            />
          </a.group>
        </Canvas>
      </Stage>
      <Spacer />
    </main>
  );
}

export default FoxDemo;
