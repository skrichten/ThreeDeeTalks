import React from 'react';
import { useSpring, animated as a } from 'react-spring/three';


const colors = ['#1B1D24', '#0D1400', '#14072A', '#000000'];

function GDogBackground({ lookIndex }) {
  const { color } = useSpring({ color: colors[lookIndex] });

  return (
    <mesh
      scale={[20000, 20000, 1]}
      position={[0, 0, -6]}
    >
      <planeGeometry attach="geometry" args={[1, 1]} />
      <a.meshBasicMaterial attach="material" color={color} depthTest={false} />
    </mesh>
  )
}

export default GDogBackground;
