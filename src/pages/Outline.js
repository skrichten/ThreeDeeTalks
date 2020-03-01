import React, { useRef, Suspense } from 'react';
import { Color } from 'three';
import { useFrame, useThree, extend, Dom } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ThreeCanvas from '../components/ThreeCanvas';
import Scene from '../components/Outline/Scene';
//import Effects from '../components/Outline/Effects';


// This part just adds 3D navigation controls
extend({ OrbitControls });
const Controls= props => {
  const { camera, gl } = useThree();
  const controls = useRef();
  camera.position.set( 0, 1.2, 6 );
  useFrame(() => controls.current && controls.current.update());
  return <orbitControls ref={controls} args={[camera, gl.domElement]} {...props} />
}
// End 3D navigation controls


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
      <Controls />
      <Suspense fallback={<Dom center>loading...</Dom>}>
        <Scene />
      </Suspense>
    </ThreeCanvas>
  )
};

export default Outline;

