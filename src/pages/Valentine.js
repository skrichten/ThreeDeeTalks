import React, { Suspense, useRef } from 'react';
import styled from 'styled-components';
import { useFrame, useThree, extend, Dom } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ThreeCanvas from '../components/ThreeCanvas';
import Heart from '../components/Valentine/Heart';
import ParticleField from '../components/ParticleField/ParticleField';

const pConfig = {
  showCube: false,
  cubeSize: 12,
  dimension: '3D',
  velocity: .005,
  boundaryType: 'bounce',
  antialias: true,
  direction: {
    xMin: -1,
    xMax: 1,
    yMin: -1,
    yMax: 1,
    zMin: -1,
    zMax: 1
  },
  lines: {
    colorMode: 'rainbow',
    color: '#351CCB',
    transparency: 0.9,
    limitConnections: true,
    maxConnections: 20,
    minDistance: 150,
    visible: false
  },
  particles: {
    colorMode: 'solid',
    color: '#ff9ef5',
    transparency: .99,
    shape: 'square',
    boundingBox: 'cube',
    count: 200,
    minSize: .5,
    maxSize: 10,
    visible: true
  }
};
// This part just adds 3D navigation controls
extend({ OrbitControls });
const Controls= props => {
  const { camera, gl } = useThree();
  const controls = useRef();
  camera.position.set( 0, 0, 3 );
  useFrame(() => controls.current && controls.current.update());
  return <orbitControls ref={controls} args={[camera, gl.domElement]} {...props} />
}
// End 3D navigation controls

const BG = styled.main`
  background: radial-gradient(circle, rgba(60,4,4,1) 0%, rgba(43,5,69,1) 100%);
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
`


const devicePixelRatio = window.devicePixelRatio.toFixed(1);

const Valentine = () => {


  return (
    <BG>
      <ThreeCanvas
        pixelRatio={devicePixelRatio}
      >
        <Controls />

        <Suspense fallback={<Dom center>loading...</Dom>}>
          <Heart showText />
        </Suspense>
        <ParticleField
          config={pConfig}
          opacity={.7}
        />

      </ThreeCanvas>
    </BG>
  )
};

export default Valentine;

