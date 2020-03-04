import React, { useEffect, useRef, useState } from 'react'
import { MeshBasicMaterial, BackSide, AnimationMixer, Vector3 } from 'three';
import { useLoader, useFrame, useResource } from 'react-three-fiber';
import { useSpring, animated as a } from 'react-spring/three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Wings from './Wings';
import Particles from '../Particles';

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


export default function Fairy({ ...props}) {
  const parent = useRef();
  const hand = useRef();
  const [wandRef, wand] = useResource()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/funnyFairy.glb');

  const actions = useRef();
  const [mixer] = useState(() => new AnimationMixer());

  useEffect(() => {

    actions.current = {
      handAction: mixer.clipAction(animations[0], hand.current),
    }

    //actions.current.handAction.play();
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, []);

  useFrame((state, delta) => { mixer.update(delta); });

  const bobSpring = useSpring({
    from: {pos: [0, -.03, 0]},
    pos: [0, .03, 0],
    config: {
      mass: 2,
      tension: 60,
      friction: 0
    }
  })

  return (
    <a.group ref={parent} {...props} position={bobSpring.pos} dispose={null}>
      <Wings />
      <group rotation-y={-1} {...props}  >
        <mesh // Body
          geometry={nodes.fairy.geometry}
          material={materials.fairyMat}
        />
        <mesh // Outline
          geometry={nodes.fairy.geometry}
        >
          <primitive
            object={outlineMat}
            uniforms={uniforms}
            uniforms-outlineThickness-value={.05}
            color="#000"
            attach="material" />
        </mesh>

        <mesh // Hand / Wand
          ref={hand}
          material={materials.fairyWingMat}
          geometry={nodes.hand.geometry}
          position={[-0.88, 0, 0.52]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
          <group
            ref={wandRef}
            position={[-1.32, 0, -1.69]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
          />
        </mesh>
        { wand &&
          <Particles
            container={wand}
            particleConfig={{
              globalSize: .2,
              blending: 'multiply',
            }}
          />
        }
      </group>
    </a.group>
  )

}
