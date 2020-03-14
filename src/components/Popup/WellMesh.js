/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import {AnimationMixer, LoopOnce} from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function WellMesh({play, ...props}) {

  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/well.glb')

  const actions = useRef();
  const [mixer] = useState(() => new AnimationMixer());
  useFrame((state, delta) => mixer.update(delta));
  useEffect(() => {
    actions.current = {
      WellFoldAction: mixer.clipAction(animations[0], group.current)
    }
    actions.current.WellFoldAction.loop = LoopOnce;
    actions.current.WellFoldAction.clampWhenFinished = true;
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, [])

  useEffect(() => {
    play && actions.current.WellFoldAction && actions.current.WellFoldAction.play();
  }, [play])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.WellBase} />
      <skinnedMesh material={materials.WellMat} geometry={nodes.Well.geometry} skeleton={nodes.Well.skeleton} />
    </group>
  )
}