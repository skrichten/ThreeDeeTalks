import React, { Suspense, useRef } from 'react';
import { Color } from 'three';
import styled from 'styled-components';
import { animated as a } from 'react-spring/three';
import { Dom } from 'react-three-fiber';
import Controls from '../components/OrbitControls';
import Camera from '../components/Camera';
import ThreeCanvas from '../components/ThreeCanvas';
import Content from '../components/Team/Content';
import useMouseSpring from '../hooks/useMouseSpring';


const devicePixelRatio = window.devicePixelRatio.toFixed(1.5);

const Team = () => {

  const onInit = ({ scene, gl }) => {
    scene.background = new Color(0xffffff);
  };


  // The useMouseSpring hook will provide the current normalized mouse postion
  // as a react-spring AnimatedValue
  const [{mouse}] = useMouseSpring({precision: .001, mass: 1, tension:120});

  // Setup an animated rotation from the useMouseSpring AnimatedValue
  // This will make the content rotate on the x and y axis based on the mouse position

  const mouseRot = mouse.interpolate((x, y) => [
    y === 0 ? 0 : (-1 * y)+.5,
    x === 0 ? 0 : (-1.4 * x)+.7,
    0
  ]);
  console.log('mouseRot', mouseRot)

  return (

      <ThreeCanvas
        pixelRatio={devicePixelRatio}
        onCreated={onInit}
      >
        {false && <Controls /> }
        <Camera position={[0, 0, 8]} />
        <Suspense fallback={<Dom center>loading...</Dom>}>
          <a.group rotation={mouseRot}>
            <Content/>
          </a.group>
        </Suspense>
      </ThreeCanvas>

  )
};

export default Team;

