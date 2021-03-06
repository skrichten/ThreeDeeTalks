/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { animated as a } from 'react-spring/three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import useScrollSpring from '../../hooks/useScrollSpring';

export default function BookGL({ scrollBounds, ...props}) {
  const group = useRef()
  const [{scrollPos}] = useScrollSpring();
  const book = useLoader(GLTFLoader, './book.glb');

  const { nodes, materials, animations } = book;

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  // This would cause the animation to play normally
  //useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = {
      HouseFoldAction: mixer.clipAction(animations[0], group.current),
      WellFoldAction: mixer.clipAction(animations[1], group.current)
    }
    // Set the animation to play.
    // The mixer is not updated so it will not progress automatically.
    actions.current.HouseFoldAction.play();
    actions.current.WellFoldAction.play();
    //Now we can control the animation time manually.
    mixer.setTime(2.2);
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, [animations, mixer]);

  const scrollMove = scrollPos.interpolate(y => {

    let pos = Math.max(y - scrollBounds[0], 0);
    pos = Math.min(pos, scrollBounds[1] - scrollBounds[0]);

    mixer.setTime(pos * 2.2);

    return [
      0,
      0,
      (pos * 7) - 3,
    ]
  });

  return (

    <a.group ref={group} {...props} dispose={null} position={scrollMove} >
      <group
        position={[2.44, 0.32, 0.42]}
        rotation={[0, 0.57, 1.07]}
      >
        <primitive
          object={nodes.Sun_Orientation}
        />
      </group>
      <group position={[-.5, 0, 0.13]} scale={[2,2,2]} >
        <primitive object={nodes.HouseBase} />
        <skinnedMesh
          material={materials.Material}
          geometry={nodes.House.geometry}
          skeleton={nodes.House.skeleton}
        />
      </group>
      <group position={[0.5, -0.01, 0.27]} scale={[2,2,2]}>
        <primitive object={nodes.WellBase} />
        <skinnedMesh
          material={materials['Material.001']}
          geometry={nodes.Well.geometry}
          skeleton={nodes.Well.skeleton}
        />
      </group>
      <mesh material={materials['Material.002']} geometry={nodes.Ground.geometry} receiveShadow />
    </a.group>
  )

}
