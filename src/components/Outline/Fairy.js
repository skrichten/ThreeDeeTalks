import React, { useEffect, useRef, useState, forwardRef } from 'react'
import { MeshBasicMaterial, BackSide, AnimationMixer, LoopOnce } from 'three';
import { useLoader, useFrame, useResource } from 'react-three-fiber';
import { useSpring, animated as a } from 'react-spring/three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Wings from './Wings';
import Particles from '../Particles';
import { Randomizers, Emitter } from 'skrichten.particles';
import useEventListener from '../../hooks/useEventListener';

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


const Fairy = forwardRef( ({ ...props}, ref) => {
  const hand = useRef();
  const [wandRef, wand] = useResource()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/funnyFairy.glb');

  const actions = useRef();
  const [mixer] = useState(() => new AnimationMixer());

  useEffect(() => {

    actions.current = {
      handAction: mixer.clipAction(animations[0], hand.current),
    }

    actions.current.handAction.loop = LoopOnce;
    actions.current.handAction.clampWhenFinished = true;

    //actions.current.handAction.play();
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, []);

  useEventListener('mousedown', () => {
    const action = actions.current.handAction
    if (!action || action.isRunning() ) return;
    action.paused = false;
    action.time = 0;
    action.play();
  })



  useFrame((state, delta) => { mixer.update(delta); });

  const bobSpring = useSpring({
    from: {pos: -.03},
    pos: .03,
    config: {
      mass: 2,
      tension: 60,
      friction: 0
    }
  })

  //new Randomizers.MinMaxRandomizer(0, 5)
  const pVelocity = new Randomizers.SphereRandomizer(.5, 1);
  const pEmit = {
    onInterval: new Randomizers.MinMaxRandomizer(0, 5),
    interval: new Randomizers.MinMaxRandomizer(0, 0.25),
  }

  return (
    <a.group ref={ref} {...props} position-y={bobSpring.pos} dispose={null}>
      <Wings />
      <group>
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
          >
            <Particles
              particleConfig={{
                startSize: .03,
                endSize: 1.5,
              }}
            />

            <Particles
              particleConfig={{
                startSize: .1,
                endSize: .4,
                velocity: pVelocity,
                ttl: 2,
                speed: 1.5,
              }}
              systemConfig={{
                particlesCount: 200,
              }}
              emitterConfig={pEmit}
            />
          </group>
        </mesh>
      </group>
    </a.group>
  )

})

export default Fairy;
