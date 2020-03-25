import React, { useRef } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/lineTest.glb')

  return (
    <group ref={group} {...props} dispose={null}>
      <lineSegments args={[nodes.BezierCircle.geometry]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <lineBasicMaterial
          attach="material"
          linewidth={35}
          resolution={[window.innerWidth, window.innerHeight]}
          color="#000000"
        />
      </lineSegments>

    </group>
  )
}
