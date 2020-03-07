import React, { useRef } from 'react';
import { useFrame, useThree, extend } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const Controls = ({ cameraPos = [0, 0, 0], ...props }) => {
  const { camera, gl } = useThree();
  const controls = useRef();
  camera.position.set( cameraPos[0], cameraPos[1], cameraPos[2] );
  useFrame(() => controls.current && controls.current.update());
  return <orbitControls ref={controls} args={[camera, gl.domElement]} {...props} />
}

export default Controls;
