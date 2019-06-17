import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { animated as a } from 'react-spring/three';
import { Canvas } from 'react-three-fiber';
import Camera from '../components/Camera';
import Ghost from '../components/GhostCurved';
import GDogContent from '../components/GDogContent';
import useScrollPos from '../hooks/useScrollPos';
import useMouse from '../hooks/useMouse';

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

function GDog() {
  const [lookIndex, setLookIndex] = useState(3);

  const [{scrollPos}] = useScrollPos();
  const [{mouse}] = useMouse({precision: .001, mass: 1, tension:120});
  const mouseRot = mouse.interpolate((x, y) => [
    (.1 * y)-.05,
    (.1 * x)-.05,
    0
  ]);

  const scrollRot = scrollPos.interpolate(y => {
    return [
      Math.min(y * 2, 1) * .5,
      Math.max(y - .5, 0) * -12.6,
      0
    ]
  })

  return (
    <main>
      <Stage>
        <Canvas gl={glConfig} >
          <Camera />
          <a.group rotation={scrollRot} position={[-.5, 0, 0]}>
            <a.group rotation={mouseRot}>
              <Ghost scale={[3.4, 3.4, 3.4]} lookIndex={lookIndex} />
            </a.group>
          </a.group>
        </Canvas>
      </Stage>
      <GDogContent setLookIndex={setLookIndex} />
    </main>

  );
}

export default GDog;
