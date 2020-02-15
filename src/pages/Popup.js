import React, { useRef } from 'react';
import { FogExp2, Color, PCFSoftShadowMap } from 'three';
import { useFrame, useThree, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ThreeCanvas from '../components/ThreeCanvas';
import Book from '../components/Popup/Book';


// This part just adds 3D navigation controls
extend({ OrbitControls });
const Controls= props => {
  const { camera, gl } = useThree();
  const controls = useRef();
  camera.position.set( 0, 2, 2 );
  useFrame(() => controls.current && controls.current.update());
  return <orbitControls ref={controls} args={[camera, gl.domElement]} {...props} />
}
// End 3D navigation controls


const devicePixelRatio = window.devicePixelRatio.toFixed(1);

const PlayGround = () => {

  const onInit = ({ scene, gl }) => {
    scene.background = new Color(0x93d2ea);
    scene.fog = new FogExp2(0x93d2ea, 0.05);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = PCFSoftShadowMap;
    gl.shadowMap.autoUpdate = true;
  };

  return (
    <ThreeCanvas
      pixelRatio={devicePixelRatio}
      onCreated={onInit}
    >
      <Controls />

      <Book />

      <directionalLight
        args={[0xffffff]}
        intensity={.7}
        position={[15, 25, 25]}
        shadow-bias={0.0001}
        shadow-camera-right={30}
        shadow-camera-left={-30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        castShadow
      ></directionalLight>
      <ambientLight args={[0x94cadd]}/>
    </ThreeCanvas>
  )
};

export default PlayGround;

