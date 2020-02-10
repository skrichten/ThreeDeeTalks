import React from 'react';
import SimpleSphere from "./SimpleSphere";
import GroundPlane from "./GroundPlane";

function Objects() {
  return (
    <group>
      <SimpleSphere
        position={[-2, 0, 0]}
      />
      <mesh
        position={[1, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
        castShadow
      >
        <octahedronBufferGeometry
          attach="geometry"
          args={[.75, 0]}
        />
        <meshStandardMaterial
          attach="material"
          color="#ffd714"
          flatShading
        />
      </mesh>
      <GroundPlane />
    </group>
  )
}

export default Objects;

