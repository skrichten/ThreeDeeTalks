import React, { useState } from 'react';
import styled from 'styled-components';
import { animated as a } from 'react-spring/three';
import { Canvas } from 'react-three-fiber';
import useScrollPos from '../hooks/useScrollPos';
import useMouse from '../hooks/useMouse';
import useMeasure from '../hooks/useMeasure';
import Camera from '../components/Camera';
import Ghost from '../components/GhostCurved';
import GDogContent from '../components/GDogContent';
import GDogBackground from '../components/GDogBackground';
import GDogParticles from '../components/GDogParticles';


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
  gammaOutput:true,
  //premultipliedAlpha: false
};

const devicePixelRatio = window.devicePixelRatio.toFixed(1);

function GDog() {
  const [measureElement, stageSize] = useMeasure();
  const camZ = stageSize.width < 768 ? 5 : 3.4;

  const [lookIndex, setLookIndex] = useState(3);

  const [{scrollPos}] = useScrollPos();
  const [{mouse}] = useMouse({precision: .001, mass: 1, tension:120});
  const mouseRot = mouse.interpolate((x, y) => [
    (.2 * y)-.1,
    (.2 * x)-.1,
    0
  ]);

  const scrollMove = scrollPos.interpolate(y => {
    return [
      -.5,
      Math.max(y - .5, 0) * -1,
      0
    ]
  });

  const scrollRot = scrollPos.interpolate(y => {
    return [
      Math.min(y * 2, 1) * .5,
      Math.max(y - .5, 0) * -12.6,
      0
    ]
  });

  return (
    <main>
      <GDogBackground lookIndex={lookIndex} />
      <Stage ref={measureElement} >
        <Canvas gl={glConfig} pixelRatio={devicePixelRatio} >
          <Camera startDist={camZ} />
          <a.group rotation={scrollRot} position={scrollMove}>
            <a.group rotation={mouseRot}>
              <GDogParticles lookIndex={lookIndex} />
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
