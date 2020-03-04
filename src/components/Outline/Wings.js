import React, { useEffect, useRef, useState } from 'react'
import { AnimationMixer } from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function FairyWings({ ...props}) {
  const wings = useRef();
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/fairyWings.glb');

  const actions = useRef();
  const [mixer] = useState(() => new AnimationMixer());
  useFrame((state, delta) => mixer.update(delta));

  useEffect(() => {
    const wingmat = materials.fairyWingMat;
    wingmat.alphaTest = .5;

    actions.current = {
      FlapAction: mixer.clipAction(animations[0], wings.current)
    }

    actions.current.FlapAction.play();
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, []);

  return (
    <group ref={wings} {...props} dispose={null}>
      <group rotation-y={-1} {...props}  >
          <primitive object={nodes.WingsBase}  />
          <skinnedMesh
            material={materials.fairyWingMat}
            geometry={nodes.wings.geometry}
            skeleton={nodes.wings.skeleton}
          />
      </group>
    </group>
  )

}
