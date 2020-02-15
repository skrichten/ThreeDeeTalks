import React from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Heart({showText, ...props}) {
  const mcTex = useLoader(THREE.TextureLoader, './matCapRedMetal2.png');
  const tTex = useLoader(THREE.TextureLoader, './hvd.png')
  const { nodes } = useLoader(GLTFLoader, './heart.glb')

  return (
    <group dispose={null} {...props}>
      <mesh
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
        geometry={nodes.Cube.geometry}
      >
        <meshMatcapMaterial
          attach="material"
          matcap={mcTex}
        />
      </mesh>
      {showText &&
        <mesh
          scale={[1.03, 1.03, 1.03]}
          position={[0, 0, 0]}
          geometry={nodes.Cube.geometry}
        >
          <meshBasicMaterial
            attach="material"
            alphaMap={tTex}
            color="#fff"
            transparent
            alphaMap-flipY={false}
          />
        </mesh>
      }
    </group>
  )
}

export default Heart;
