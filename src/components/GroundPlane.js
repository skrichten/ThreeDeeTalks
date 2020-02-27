import React from 'react';

function GroundPlane({ color='#547a2c', ...props }) {
  return (
    <mesh
      rotation-x={-Math.PI / 2}
      receiveShadow
      {...props}
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









