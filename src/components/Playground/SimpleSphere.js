import React from 'react';

function SimpleSphere({
  color = '#8660c4',
  ...props
}) {
  return (
    <mesh {...props} castShadow>
      <sphereBufferGeometry
        attach="geometry"
        args={[.75, 32, 32]}
      />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

export default SimpleSphere;

