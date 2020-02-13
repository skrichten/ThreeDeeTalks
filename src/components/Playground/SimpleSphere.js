import React from 'react';

function SimpleSphere({
  color = '#8660c4',
  ...props
}) {
  return (
    <mesh {...props} castShadow>
      <dodecahedronBufferGeometry
        attach="geometry"
        args={[.75, 1]}
      />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

export default SimpleSphere;

