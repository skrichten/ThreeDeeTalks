import React, { useState } from 'react';
import styled from 'styled-components';
import { animated as a } from 'react-spring/three';
import { Canvas } from 'react-three-fiber';
import useScrollPos from '../hooks/useScrollPos';
import useMouse from '../hooks/useMouse';
import useMeasure from '../hooks/useMeasure';
import Frame from '../components/Frame';

const Main = styled.main`
  min-height: 5000px;
`;

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

function Blamo() {
  // Use measure hook uses ResizeObserver to watch the given ref element
  // And returns the new size.
  const [measureElement, stageSize] = useMeasure();
  // Store a camera Z position based on the screensize
  const camZ = stageSize.width < 768 ? 5 : 3.4;


  // The useScrollPos hook will provide the current normalized scroll position
  // as a react-spring AnimatedValue
  const [{scrollPos}] = useScrollPos();

  // The useMouse hook will provide the current normalized mouse postion
  // as a react-spring AnimatedValue
  const [{mouse}] = useMouse({precision: .001, mass: 1, tension:120});

  // Setup an animated rotation from the useMouse AnimatedValue
  // This will make the ghost rotate on the x and y axis based on the mouse position
  // The math makes the rotation go between -.1 and + .1 radians.
  const mouseRot = mouse.interpolate((x, y) => [
    (.2 * y)-.1,
    (.2 * x)-.1,
    0
  ]);

  // Setup and animated position from the useScrollPos AnimatedValue
  // This will move the ghost from 0 to -.5, but the movement will not start until after scrolling
  // half way. The purpose of this one is to just give the ghost a better position by the end
  // the full animation.
  const scrollMove = scrollPos.interpolate(y => {
    return [
      0,
      0,
      1.3 + ( y * 6 )
    ]
  });

  return (
    <Main>
      <Stage ref={measureElement} >
        <Canvas gl={glConfig} pixelRatio={devicePixelRatio} >
          <a.group position={scrollMove}>
            <a.group rotation={mouseRot}>
              <Frame position={[0,0,-4]} />
              <Frame position={[0,0,-3]} />
              <Frame position={[0,0,-2]} />
              <Frame position={[0,0,-1]} />
              <Frame />
              <Frame position={[0,0,1]} />
              <Frame position={[0,0,2]} />
            </a.group>
          </a.group>
        </Canvas>
      </Stage>
    </Main>
  );
}

export default Blamo;
