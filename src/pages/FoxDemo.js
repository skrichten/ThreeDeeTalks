import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas, useRender } from 'react-three-fiber';
import Camera from '../components/Camera';
import Fox from '../components/Fox';
import useScrollPos from '../hooks/useScrollPos';
import useMouse from '../hooks/useMouse';
import { animated as a } from 'react-spring/three';


const Spacer = styled.div`
  height: 5000px;
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
  const [{scrollPos}] = useScrollPos();
  const [{mouse}] = useMouse({precision: .001, mass: 1, tension:120});
  const interpRot = mouse.interpolate((x, y) => [
    (.04 * y)-.02,
    (.04 * x)-.02,
    0
  ]);

  const interpPos = scrollPos.interpolate(y => {
    return [0, 0, -Math.sin(y*3.14) * 2.5]
  })

  return (
    <main>
      <Stage>
        <Canvas gl={glConfig} >
          <Camera />
          <a.group>
            <a.group rotation = {interpRot}>
              <Fox
                scale={[2.5, 2.5, 2.5]}
                rotation={[0, -.48, 0]}
                position={[.4, -.57, 2.2]}
              />
            </a.group>
          </a.group>
        </Canvas>
      </Stage>
      <Spacer />
    </main>
  );
}

export default FoxDemo;
