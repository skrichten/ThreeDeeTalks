import React from 'react';

function GDogParticles({ lookIndex }) {
  return (
    <points>
      <pointsMaterial sizeAttenuation={true} attach="material" />
      <torusKnotGeometry attach="geometry" args={[10, 3, 150, 16]} />
    </points>
  )
}

export default GDogParticles;
