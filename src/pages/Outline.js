import React, { useRef, Suspense } from 'react';
import { Color } from 'three';
import { useFrame, useThree, extend, Dom } from 'react-three-fiber';
import Controls from '../components/OrbitControls';
import ThreeCanvas from '../components/ThreeCanvas';
import Scene from '../components/Outline/Scene';
//import Effects from '../components/Outline/Effects';


const devicePixelRatio = window.devicePixelRatio.toFixed(1);

const Outline = () => {

  const onInit = ({ scene, gl }) => {
    scene.background = new Color(0xffffff);
  };

  return (
    <ThreeCanvas
      pixelRatio={devicePixelRatio}
      onCreated={onInit}
    >
      <Controls cameraPos={[0, 1.26, 6]} />
      <Suspense fallback={<Dom center>loading...</Dom>}>
        <Scene />
      </Suspense>
    </ThreeCanvas>
  )
};

export default Outline;

