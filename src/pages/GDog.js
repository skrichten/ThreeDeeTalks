import React, { useState } from 'react';
import styled from 'styled-components';
import { animated as a } from 'react-spring/three';
import { Canvas } from 'react-three-fiber';
import useScrollSpring from '../hooks/useScrollSpring';
import useMouseSpring from '../hooks/useMouseSpring';
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
  // Use measure hook uses ResizeObserver to watch the given ref element
  // And returns the new size.
  const [measureElement, stageSize] = useMeasure();
  // Store a camera Z position based on the screensize
  const camZ = stageSize.width < 768 ? 5 : 3.4;

  // The various "looks" are based on this index which gets passed to child components
  const [lookIndex, setLookIndex] = useState(3);

  // The useScrollSpring hook will provide the current normalized scroll position
  // as a react-spring AnimatedValue
  const [{scrollPos}] = useScrollSpring();

  // The useMouseSpring hook will provide the current normalized mouse postion
  // as a react-spring AnimatedValue
  const [{mouse}] = useMouseSpring({precision: .001, mass: 1, tension:120});

  // Setup an animated rotation from the useMouseSpring AnimatedValue
  // This will make the ghost rotate on the x and y axis based on the mouse position
  // The math makes the rotation go between -.1 and + .1 radians.
  const mouseRot = mouse.interpolate((x, y) => [
    (.2 * y)-.1,
    (.2 * x)-.1,
    0
  ]);

  // Setup and animated position from the useScrollSpring AnimatedValue
  // This will move the ghost from 0 to -.5, but the movement will not start until after scrolling
  // half way. The purpose of this one is to just give the ghost a better position by the end
  // the full animation.
  const scrollMove = scrollPos.interpolate(y => {
    return [
      -.5,
      Math.max(y - .5, 0) * -1,
      0
    ]
  });

  // Setup an animated rotation from the useScrollSpring AnimatedValue
  // For the first half of the scroll, the ghost will rotate .5 radians on the x axis
  // For the second half of the scroll, the ghost will rotate -6.3 radians on the y axis
  const scrollRot = scrollPos.interpolate(y => {
    console.log(Math.max(y - .5, 0) * -12.6)
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
