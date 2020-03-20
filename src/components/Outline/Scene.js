import React, { useRef } from 'react';
import { useThree, useFrame } from "react-three-fiber";
import { animated as a } from 'react-spring/three';
import Effects from './Effects';
import Fairy from './Fairy';
import useMouseSpring from '../../hooks/useMouseSpring';
import ImagePlane from '../ImagePlane';
import { Vector3 } from 'three';



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
      <ImagePlane
        url="/placeholder.png"
        width={277}
        height={591}
        position-z={-1}
      />
      <Effects />
    </group>
  )

}
