import React, { useRef } from 'react';
import { useThree, useFrame } from "react-three-fiber";
import { animated as a } from 'react-spring/three';
import Effects from './Effects';
import Fairy from './Fairy';
import useMouseSpring from '../../hooks/useMouseSpring';
import Crumple from './Crumple';


export default function Scene({ ...props}) {
  const { viewport } = useThree();

  const [{mouse}] = useMouseSpring({precision: .001, mass: 1, tension:120});
  const mouseRot = mouse.interpolate( (x) => ((x * 2) - 1) * 1.3 );
  const mousePos = mouse.interpolate( (x, y) => {
    const mappedX = (x * 2) - 1;
    return [
      ((mappedX * viewport.width) / 2) - (mappedX * 3),
      -((((y * 2) - 1) * viewport.height) / 2) - .8,
      0
    ]
  });

  const fairyRef = useRef();

  return (
    <group  {...props}>
      <a.object3D rotation-y={mouseRot} position={mousePos}>
        <Fairy ref={fairyRef} />
      </a.object3D>
      <Crumple position-z={15} scale={[3, 3, 3]} />

      <directionalLight
        args={[0xffffff]}
        intensity={.5}
        position={[3, 3, 4]}
        shadow-bias={0.0001}
        shadow-camera-right={5}
        shadow-camera-left={-1}
        shadow-camera-top={5}
        shadow-camera-bottom={-2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-radius={15}
        castShadow
    ></directionalLight>

    <ambientLight args={[0xffffff, .7]}/>

      <Effects />
    </group>
  )

}
