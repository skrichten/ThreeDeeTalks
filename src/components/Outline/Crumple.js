import React, { useRef, useEffect, useState, useMemo, forwardRef, useImperativeHandle } from 'react'
import { useLoader, useFrame } from 'react-three-fiber';
import { AnimationMixer, AnimationUtils, LoopOnce, TextureLoader } from 'three';
import { animated as a, useSpring } from 'react-spring/three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Crumple = forwardRef( ({
  play,
  imagePath,
  animationPath,
  speed = 2,
  shadeless,
  onMouseOver = () => {},
  onMouseOut = () => {},
  ...props
}, ref) => {
  const sceneRef = useRef()
  const gltf = useLoader(GLTFLoader, animationPath);
  const { nodes, animations } = gltf;

  // We need to clone in order to be able to control the animations on individual instances.
  const clone = useMemo(() => nodes.ClothKeys.clone(), [nodes]);

  const map = useMemo(() => new TextureLoader().load(imagePath), [imagePath]);
  const matCap = useMemo(() => new TextureLoader().load('/simpleMatcap.jpg'), []);

  // Setup State and Spring for fade animation
  const [show, setShow] = useState(false);
  const { opacity } = useSpring({ from: { opacity: 0 }, opacity: show ? 1 : 0, config: { duration: 500 } })

  const [crumpState, setCrumpState] = useState('closed');

  // Manage animation mixer
  const [mixer] = useState(() => new AnimationMixer());

  useFrame((state, delta) => {
      mixer.update(delta);
  });

  // Setup animation actions
  const actions = useRef();
  useEffect(() => {
    const moClip = AnimationUtils.subclip(animations[0], 'moClip', 24, 17, 24);

    actions.current = {
      aniAction: mixer.clipAction(animations[0], sceneRef.current),
      moAction: mixer.clipAction(moClip, sceneRef.current),
    }

    actions.current.aniAction.loop = LoopOnce;
    actions.current.aniAction.clampWhenFinished = true;
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, []);

  useImperativeHandle(ref, () => ({
    fadeIn(direction) {
      if (direction === 1 && !show) {
        setShow(true);
      } else if ((direction === -1 && show)) {
        setShow(false);
      }
    },

    play(direction) {
      const action = actions.current.aniAction;
      if (!action ) return;
      mixer.timeScale = speed * direction;
      action.paused = false;
      action.play();
      setCrumpState(direction === 1 ? 'open' : 'closed');
    }
  }), [setShow, show]);


  const onPointerOver = e => {
    e.stopPropagation();
    const action = actions.current.aniAction;
    if (!action || action.isRunning() || crumpState === 'closed' ) return;
    mixer.timeScale = -1;
    action.paused = false;
    action.play();
    onMouseOver();

    // Stop crumple part way
    setTimeout(() => {
      setCrumpState('mid');
      mixer.timeScale = 0;
    }, 300);
  }

  const onPointerOut = e => {
    e.stopPropagation();
    onMouseOut();
    if (crumpState !== 'closed') {
      mixer.timeScale = 1;
      setCrumpState('open');
    }
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
