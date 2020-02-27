import {AnimationMixer, LoopOnce, BackSide} from 'three'
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle  } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const PopMesh = forwardRef( ({
  play,
  flip,
  prefix,
  path,
  direction,
  onLoop,
  ...props
}, ref) => {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, path)

  const actions = useRef();
  const [mixer] = useState(() => new AnimationMixer())
  mixer.timeScale = 3 * direction;
  useFrame((state, delta) => mixer.update(delta))

  useEffect(() => {
    //materials[prefix + 'Mat'].shadowSide = BackSide;
    actions.current = {
      foldAction: mixer.clipAction(animations[0], group.current)
    }
    actions.current.foldAction.loop = LoopOnce;
    actions.current.foldAction.clampWhenFinished = true;
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, [])

  useEffect(() => {
    mixer.addEventListener( 'loop', onLoop);
    return () => mixer.removeEventListener( 'loop', onLoop);
  }, [mixer])

  useImperativeHandle(ref, () => ({
    play() {
      const action = actions.current.foldAction
      if (!action || action.isRunning() ) return;
      action.paused = false;
      action.play();
    }
  }));

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation-y={ flip ? Math.PI : 0}>
        <primitive object={nodes[prefix + 'Base']} />
        <skinnedMesh
          material={materials[prefix + 'Mat']}
          geometry={nodes[prefix].geometry}
          skeleton={nodes[prefix].skeleton}
          castShadow
        />
      </group>
    </group>
  )
})

export default PopMesh
