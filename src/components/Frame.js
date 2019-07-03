import React, { useEffect, useState, useMemo, useRef } from 'react';
import { MeshBasicMaterial } from 'three';
import { useSpring, animated as a } from 'react-spring/three';
import { useRender } from 'react-three-fiber';
import { loadGLTF } from '../util/loaders';
import { TextureLoader, Vector3 } from 'three';

function loadFrame() {
  return loadGLTF('./frame.glb')
    .then(gltf => {
      const scene = gltf.scene;
      let mesh;
      scene.traverse( function ( child ) {
        if ( child.isMesh ) {
          child.material = new MeshBasicMaterial();
          mesh = child;
        }
      })
      return mesh;
    })
}

function Frame({ imgSrc, ...props }) {
  //const frameRef = useRef();
  const [showImage, setShowImage] = useState(false);
  const { transition } = useSpring({ from: { transition: 0 }, transition: showImage ? 1 : 0, config: { duration: 700 } })
  const [frame, setFrame] = useState(false);
  const texture = useMemo(() => new TextureLoader().load(imgSrc), [imgSrc]);
  const scale = transition.interpolate( s => [s + .01, s + .01, 1]);

  useEffect(() =>  void loadFrame().then(setFrame), [setFrame] );

  let wp = new Vector3();
  useRender( ({ scene }) => {
    if (!frame || showImage) return;
    scene.updateMatrixWorld();
    frame.getWorldPosition(wp);
    if (wp.z > 2) {
      setShowImage(true);
    }
  }, false, [frame, setShowImage]);

  return (
    frame ? (
      <primitive object={frame} {...props} >
        <a.mesh position={[0, 0, -.01]} scale={scale}>
          <planeBufferGeometry attach="geometry" args={[1.8, 1.8, 1.8]} />
          <a.meshBasicMaterial attach="material" transparent opacity={transition} >
            <primitive attach="map" object={texture} />
          </a.meshBasicMaterial>
        </a.mesh>
      </primitive>
    )
    : <mesh />
  )

}

export default Frame;
