import React from 'react';
import GroundPlane from "./GroundPlane";

function Objects() {
  return (
    <group>

      <mesh position={[-2, 0, 0]} castShadow>
        <sphereBufferGeometry
          attach="geometry"
          args={[.75, 32, 32]}
        />
        <meshStandardMaterial attach="material" color="#8660c4" />
      </mesh>

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

