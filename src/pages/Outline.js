import React, { useRef, Suspense } from 'react';
import { Color } from 'three';
import { Dom } from 'react-three-fiber';
import Controls from '../components/OrbitControls';
import Camera from '../components/Camera';
import ThreeCanvas from '../components/ThreeCanvas';
import Scene from '../components/Outline/Scene';
//import Effects from '../components/Outline/Effects';


const devicePixelRatio = window.devicePixelRatio.toFixed(2);

const Outline = () => {

  const onInit = ({ scene, gl }) => {
    scene.background = new Color(0xffffff);
  };

  return (
    <ThreeCanvas
      pixelRatio={devicePixelRatio}
      onCreated={onInit}
    >
      <Camera position={[0, .5, 25]} fov={65} />
      <Suspense fallback={<Dom center>loading...</Dom>}>
        <Scene />
      </Suspense>
    </ThreeCanvas>
  )
};

export default Outline;

