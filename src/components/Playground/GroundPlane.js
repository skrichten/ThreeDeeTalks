import React from 'react';

function GroundPlane({ color='#63913b' }) {
  return (
    <mesh
      rotation-x={-Math.PI / 2}
      position={[0, -.75, 0]}
      receiveShadow
    >
      <planeBufferGeometry
        attach="geometry"
        args={[100, 100, 1, 1]}
      />
      <meshStandardMaterial
        attach="material"
        color={color}
      />
    </mesh>
  )
}

export default GroundPlane;









