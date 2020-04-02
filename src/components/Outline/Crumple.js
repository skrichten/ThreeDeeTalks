import React, { useRef, useEffect, useState, useMemo, forwardRef, useImperativeHandle } from 'react'
import { useLoader, useFrame } from 'react-three-fiber';
import { AnimationMixer, LoopOnce, TextureLoader } from 'three';
import { animated as a, useSpring } from 'react-spring/three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Crumple = forwardRef( ({
  play,
  imagePath,
  animationPath,
  direction,
  ...props
}, ref) => {
  const sceneRef = useRef()
  const gltf = useLoader(GLTFLoader, animationPath);
  const { nodes, animations, scene } = gltf;
  const clone = useMemo(() => nodes.ClothKeys.clone(), [nodes]);

  const map = useMemo(() => new TextureLoader().load(imagePath), [imagePath]);

  // Setup State and Spring for fade animation
  const [show, setShow] = useState(false);
  const { opacity } = useSpring({ from: { opacity: 0 }, opacity: show ? 1 : 0, config: { duration: 500 } })

  const actions = useRef();
  const [mixer] = useState(() => new AnimationMixer());
  mixer.timeScale = 2 * direction;

  useFrame((state, delta) => {
    //mixer.setTime(1 - scrollPos.value);
    mixer.update(delta);
  });

  useEffect(() => {

    actions.current = {
      aniAction: mixer.clipAction(animations[0], sceneRef.current),
    }

    actions.current.aniAction.loop = LoopOnce;
    actions.current.aniAction.clampWhenFinished = true;
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, []);

  useImperativeHandle(ref, () => ({
    fadeIn() {
      if (direction === 1 && !show) {
        setShow(true);
      } else if ((direction === -1 && show)) {
        setShow(false);
      }
    },

    play() {
      const action = actions.current.aniAction;
      if (!action || action.isRunning() ) return;
      action.paused = false;
      action.play();
    }
  }), [setShow, show, direction]);

  return (
    <group {...props} dispose={null} rotation-x={Math.PI / 2}>
      <scene ref={sceneRef}>
        <mesh
          morphTargetInfluences={clone.morphTargetInfluences}
          morphTargetDictionary={clone.morphTargetDictionary}
          name="ClothKeys"
        >
          <bufferGeometry attach="geometry" {...clone.geometry} />
          <a.meshStandardMaterial
            attach="material"
            morphTargets={true}
            map={map}
            color="#ffffff"
            flatShading
            map-flipY={false}
            opacity={opacity}
            transparent
          />
        </mesh>
      </scene>
    </group>
  )
})

export default Crumple;
