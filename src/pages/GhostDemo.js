import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas, useRender, useThree, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GhostAnimation from '../components/GhostAnimation'
import Markers from '../components/Markers';
import * as resources from '../resources/index'
import * as THREE from 'three';

// This part just adds 3D navigation controls
extend({ OrbitControls });
function Controls(props) {
  const { camera, scene } = useThree();

  scene.background = new THREE.Color( 0x21103a );
  scene.fog = new THREE.FogExp2( 0x21103a, .12 );

  const controls = useRef();
  useRender(() => controls.current && controls.current.update());
  return <orbitControls ref={controls} args={[camera]} {...props} />
}
// End 3D navigation controls

const Spacer = styled.div`
  height: 100vh;
`;

const Stage = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  overflow: hidden;
`

const glConfig = {
  gammaInput: true,
  gammaOutput:true,
  gammaFactor: 2.2,
  premultipliedAlpha: false
};

const cameraConfig = {
  position: [0,2,5],
  rotation: [ 0, 0, 0]
}


// This is for the postprocessing effects
const effectRes = new THREE.Vector2( window.innerWidth, window.innerHeight );
extend(resources);
function Effect() {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  useEffect(() => void composer.current.setSize(size.width*2, size.height*2), [size]);
  useRender( ({ gl }) => {
    if (!composer || !composer.current) return;
    gl.autoClear = true;
    composer.current.render();
  }, true);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera}  />
      <unrealBloomPass attachArray="passes" args={[effectRes, 1.3, 0.3, 0.2]}  />
      <afterimagePass attachArray="passes" factor={0.8} renderToScreen />
    </effectComposer>
  );
}

function GhostDemo() {

  return (
    <main>
      <Stage>
        <Canvas gl={glConfig} camera={cameraConfig} >
          <axesHelper args={0.3} />
          <Controls />
          <Markers position-y={-1} />
          <GhostAnimation />
          <mesh rotation={[-Math.PI/2, 0, 0]} position-y={-1}>
            <planeGeometry attach="geometry" args={[60, 60]} />
            <meshPhongMaterial attach="material"
              color={0xffffff} shininess={0} />
          </mesh>
          <Effect />
        </Canvas>
      </Stage>

      <Spacer />
    </main>
  );
}

export default GhostDemo;
