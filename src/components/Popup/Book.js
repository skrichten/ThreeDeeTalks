import React from 'react';

import GroundPlane from "../GroundPlane";

function Book({ color='#63913b' }) {
  return (
    <>
    <group>
      <axesHelper />
      <mesh
        position={[.5, 0, 0]}
        receiveShadow
      >
        <boxBufferGeometry
          attach="geometry"
          args={[1, .005, 1.2]}
        />
        <meshStandardMaterial
          attach="material"
          color="#fff"
        />
      </mesh>

      <mesh
        position={[.5, .005, 0]}
        receiveShadow
      >
        <boxBufferGeometry
          attach="geometry"
          args={[1, .005, 1.2]}
        />
        <meshStandardMaterial
          attach="material"
          color="#fff"
        />
      </mesh>

    </group>
    <GroundPlane />
    </>
  )
}

export default Book;
