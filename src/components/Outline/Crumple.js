import React, { useRef, useEffect, useState, useMemo } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { AnimationMixer, LoopPingPong, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useScrollSpring from '../../hooks/useScrollSpring';

export default function Crumple(props) {
  const sceneRef = useRef()
  const gltf = useLoader(GLTFLoader, '/crumple.glb');
  const { scene, nodes, materials, animations } = gltf;

  const [[{scrollPos}]] = useScrollSpring({});
  //const scrollTime = scrollPos.interpolate(y => ( [0, 0, y * .002] ) );

  const actions = useRef();
  const [mixer] = useState(() => new AnimationMixer());

  console.log(materials)

  useEffect(() => {

    actions.current = {
      aniAction: mixer.clipAction(animations[0], sceneRef.current),
    }

    actions.current.aniAction.loop = LoopPingPong;

    actions.current.aniAction.play();
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, []);

  useFrame((state, delta) => {
    mixer.setTime(1 - scrollPos.value);
    //console.log('t: ', scrollPos.value);
    //mixer.update(scrollPos.value);
  });

  const map = useMemo(() => new TextureLoader().load('/bike.jpg'), []);

  return (
    <group {...props} dispose={null} rotation-x={Math.PI / 2}>
      <scene ref={sceneRef}>
        <mesh
          morphTargetInfluences={nodes.ClothKeys.morphTargetInfluences}
          morphTargetDictionary={nodes.ClothKeys.morphTargetDictionary}
          name="ClothKeys"
        >
          <bufferGeometry attach="geometry" {...nodes.ClothKeys.geometry} />
          <meshStandardMaterial
            attach="material"
            morphTargets={true}
            map={map}
            color="#ffffff"
            flatShading
            map-flipY={false}
          />
        </mesh>
      </scene>


    </group>
  )
}
