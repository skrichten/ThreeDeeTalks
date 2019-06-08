import React, { useRef, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { Canvas, useRender, useThree, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CheatStart from './pages/CheatStart';
import CheatHardMath from './pages/CheatHardMath';
import CheatDemo from './pages/CheatDemo';
import * as THREE from 'three';

// This part just adds 3D navigation controls
extend({ OrbitControls });
function Controls(props) {
  const { camera, scene } = useThree();

  scene.background = new THREE.Color( 0x1a0d2d );
  scene.fog = new THREE.FogExp2( 0x1a0d2d, .1 );

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
}

const cameraConfig = {
  position: [0,0,3],
  rotation: [ 0, 0, 0]
}

const demos = [
  <CheatStart />,
  <CheatHardMath />,
  <CheatDemo />
]




function App() {
  const [demoIndex, setDemoIndex] = useState(0);

  return (
    <div className="App">
      <Stage>
        <Canvas gl={glConfig} camera={cameraConfig} >

          <axesHelper args={0.3} />
          <Controls />

          <mesh rotation={[-Math.PI/2, 0, 0]} position-y={-1}>
            <planeGeometry attach="geometry" args={[60, 60]} />
            <meshPhongMaterial attach="material"
              color={0xffffff} shininess={0} />
          </mesh>
          { demos[demoIndex] }
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
