import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import { Canvas, useRender, useThree, extend, apply } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CheatStart from './pages/CheatStart';
import CheatHardMath from './pages/CheatHardMath';
import CheatDemo from './pages/CheatDemo';
import Markers from './components/Markers';
import * as resources from './resources/index'
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
const DemoButton = styled.button`
  color: #fff;
  background-color: rgba(0,0,0,0);
  border: solid 1px rgba(255,255,255,.3);
  border-radius: 4px;
  margin-right: 3px;
  cursor: pointer;
`;

const Nav = styled.nav`
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
`;

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

const demos = [
  <CheatStart />,
  <CheatHardMath />,
  <CheatDemo />
];

// This is for the postprocessing effects
const effectRes = new THREE.Vector2( window.innerWidth, window.innerHeight );
extend(resources);
function Effect() {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  useEffect(() => void composer.current.setSize(size.width*2, size.height), [size]);
  useRender(({ gl }) => void ((gl.autoClear = true), composer.current.render()), true);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera}  />
      <unrealBloomPass attachArray="passes" args={[effectRes, 1.3, 0.3, 0.2]}  />
      <afterimagePass attachArray="passes" factor={0.8} renderToScreen />
    </effectComposer>
  );
}

function App() {
  const [demoIndex, setDemoIndex] = useState(0);

  return (
    <div className="App">
      <Stage>
        <Canvas gl={glConfig} camera={cameraConfig} >
          <axesHelper args={0.3} />
          <Controls />
          <Markers position-y={-1} />
          { demos[demoIndex] }
          <mesh rotation={[-Math.PI/2, 0, 0]} position-y={-1}>
            <planeGeometry attach="geometry" args={[60, 60]} />
            <meshPhongMaterial attach="material"
              color={0xffffff} shininess={0} />
          </mesh>
          <Effect />
        </Canvas>
      </Stage>
      <Nav>
        {
        demos.map( (demo, index) =>
          <DemoButton key={index} onClick={() => setDemoIndex(index)}>
            Demo {index + 1}
          </DemoButton>)
        }
      </Nav>

      <Spacer />
    </div>
  );
}

export default App;
