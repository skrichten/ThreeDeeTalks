import React from 'react';

function Tree(props) {
  return (
    <group {...props} /* Tree */>
      <mesh  /* Trunk */
        position={[0, 0, 0]}
        castShadow
      >
        <cylinderBufferGeometry
          attach="geometry"
          args={[.3, .3, 2, 32]}
        />
        <meshStandardMaterial attach="material" color="#664429" />
      </mesh>
      {[2, 1.6, 1.4, 1.2].map((t, i) => (
        // TODO try to get rid of scale and make random values for cone args instead
        <mesh key={t}
          position={[0, i+2, 0]}
          scale={[t, t, t]}
          castShadow
        >
          <coneBufferGeometry
            attach="geometry"
            args={[1, 1.5, 6]}
          />
          <meshStandardMaterial attach="material" color="#497a2e" />
        </mesh>
      ))}
    </group>
  )
}

export default Tree;



