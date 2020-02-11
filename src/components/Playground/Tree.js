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
      {[1,2,3,4].map((t) => (
        <mesh key={t}
          position={[0, (t+(.8-(t*.2))), 0]}
          castShadow
        >
          <coneBufferGeometry
            attach="geometry"
            args={[(( 1/t ) *1.5)+.4, 2.2 - (t*.2), 6]}
          />
          <meshStandardMaterial attach="material" color="#497a2e" />
        </mesh>
      ))}
    </group>
  )
}

export default Tree;



