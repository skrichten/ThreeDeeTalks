import React, { useRef } from 'react';
import { MeshBasicMaterial, BackSide, TextureLoader } from 'three';
import { animated as a } from 'react-spring/three';
import { useLoader, useFrame, useResource } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Effects from './Effects';

const outlineMat = new MeshBasicMaterial({
  color:'#000000',
  side: BackSide,
});

outlineMat.defines = {USE_ENVMAP:""};
const uniforms = {
	outlineThickness: {value: 0.03}
}
outlineMat.onBeforeCompile = (shader) => {
  shader.uniforms.outlineThickness = uniforms.outlineThickness;
  shader.vertexShader = `
    	uniform float outlineThickness;
      ` + shader.vertexShader;
  const token = '#include <begin_vertex>'
  const customTransform = `
    vec3 transformed = position + objectNormal * outlineThickness;
  `
  shader.vertexShader = shader.vertexShader.replace(token, customTransform)
}

//outlineMat.uniforms.outlineThickness = .02;

export default function Scene({ ...props}) {

  //const ghost = useLoader(GLTFLoader, '/ghost.glb')

  const [mRef, mesh] = useResource();
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/funnyFairy.glb');
  const mcapText = useLoader(TextureLoader, 'outlineMatcap.png');

  return (
    <group  {...props}>
      <group rotation-y={-1} >
        <mesh
          ref={mRef}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
          geometry={nodes.fairy.geometry}
          material={materials.fairyMat}
        />
        <mesh
          ref={mRef}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
          geometry={nodes.fairy.geometry}
        >
          <primitive
            object={outlineMat}
            uniforms={uniforms}
            uniforms-outlineThickness-value={.05}
            color="#000"
            attach="material" />
        </mesh>
        <mesh
          ref={mRef}

          position={[-1.07, 1.01, 0.07]}
          rotation={[2.09, 0, -Math.PI / 2]}
          scale={[1, 1, 1]}
          geometry={nodes.wings.geometry}
          material={materials.fairyMat}
        />
      </group>
      <Effects />
    </group>
  )

}
