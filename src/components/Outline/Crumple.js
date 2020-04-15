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
  speed = 2,
  shadeless,
  ...props
}, ref) => {
  const sceneRef = useRef()
  const gltf = useLoader(GLTFLoader, animationPath);
  const { nodes, animations } = gltf;
  const clone = useMemo(() => nodes.ClothKeys.clone(), [nodes]);

  const map = useMemo(() => new TextureLoader().load(imagePath), [imagePath]);
  const matCap = useMemo(() => new TextureLoader().load('/simpleMatcap.jpg'), []);

  // Setup State and Spring for fade animation
  const [show, setShow] = useState(false);
  const { opacity } = useSpring({ from: { opacity: 0 }, opacity: show ? 1 : 0, config: { duration: 500 } })

  const actions = useRef();
  const [mixer] = useState(() => new AnimationMixer());
  mixer.timeScale = speed * direction;

  const [crumpState, setCrumpState] = useState('closed');

  useFrame((state, delta) => {
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
      setCrumpState(direction === 1 ? 'open' : 'closed');
    }
  }), [setShow, show, direction]);


  const onPointerOver = e => {
    e.stopPropagation();

    const action = actions.current.aniAction;
    if (!action || action.isRunning() || crumpState !== 'open' ) return;
    mixer.timeScale = -.7;
    action.paused = false;
    action.play();

    setTimeout(() => {
      mixer.timeScale = .7;
      setCrumpState('open');
    }, 700);
    document.body.style.cursor = 'pointer';
  }

  const onPointerOut = e => {
    e.stopPropagation();
    document.body.style.cursor = 'default';
  }

  return (
    <group
      {...props}
      dispose={null}
      rotation-x={Math.PI / 2}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <scene ref={sceneRef}>
        <mesh
          morphTargetInfluences={clone.morphTargetInfluences}
          morphTargetDictionary={clone.morphTargetDictionary}
          name="ClothKeys"
        >
          <bufferGeometry attach="geometry" {...clone.geometry} />
          {shadeless
            ? <a.meshBasicMaterial
              attach="material"
              morphTargets={true}
              map={map}
              color="#ffffff"
              map-flipY={false}
              opacity={opacity}
              transparent
            />
            : <a.meshMatcapMaterial
              attach="material"
              morphTargets={true}
              matcap={matCap}
              map={map}
              color="#ffffff"
              flatShading
              map-flipY={false}
              opacity={opacity}
              transparent
            />
          }

        </mesh>
      </scene>
    </group>
  )
})

export default Crumple;
