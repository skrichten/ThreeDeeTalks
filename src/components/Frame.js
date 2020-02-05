import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react';
import { MeshBasicMaterial } from 'three';
import { useSpring, animated as a } from 'react-spring/three';
import { useFrame } from 'react-three-fiber';
import { loadGLTF } from '../util/loaders';
import { TextureLoader, Vector3 } from 'three';
import WaveFadeShader from '../resources/shaders/WaveFadeShader';
import CrosshatchShader from '../resources/shaders/CrosshatchShader';
import CircleFadeShader from '../resources/shaders/CircleFadeShader';

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

const shaders = [
  WaveFadeShader,
  CircleFadeShader,
  CrosshatchShader,
];

function Frame({ pid, imgData, shaderIndex, ...props }) {
  const TransShader = shaders[shaderIndex];
  const material = useRef();
  const [showImage, setShowImage] = useState(false);
  const { transition } = useSpring({ from: { transition: 0 }, transition: showImage ? 1 : 0, config: { duration: 1000 } })
  const [frame, setFrame] = useState(false);
  const uniforms = useMemo(() => {
    return {
      u_progress: { type: "f", value: 0 },
      u_tex: { type: "t", value: new TextureLoader().load(imgData.largeImageURL) }
    }
  }, [imgData]);

  const getImageSize = useCallback(() => {
    let { imageWidth:w, imageHeight:h } = imgData;
    let ratio;
    let max = 1.8;
    if ( w > h ) {
      ratio = max / w;
      w = max;
      h = h * ratio;
    } else if ( h > w ) {
      ratio = max / h;
      h = max;
      w = w * ratio;
    } else {
      h = w = max;
    }
    return [w, h, 1];
  }, [imgData]);

  useEffect(() =>  void loadFrame().then(setFrame), [setFrame] );

  // Used to hold the World Position of this frame
  let wp = new Vector3();
  useFrame( ({ scene }) => {
    if (!frame) return;
    scene.updateMatrixWorld();
    frame.getWorldPosition(wp);
    // When the frame gets close to the camera.
    if (wp.z > 1.2) {
      setShowImage(true);
      uniforms.u_progress.value = transition.value;
    }
    if (wp.z > 20) {
    }
  }, false, [frame, setShowImage, uniforms]);

  return (
    frame ? (
      <primitive object={frame} {...props} >
        <a.mesh position={[0, 0, -.01]} >
          <planeBufferGeometry attach="geometry" args={ getImageSize() } />
          <shaderMaterial attach="material"
            ref={material}
            vertexShader={TransShader.vertShader}
            fragmentShader={TransShader.fragShader}
            uniforms={uniforms}
            transparent
          />
        </a.mesh>
      </primitive>
    )
    : null
  )

}

export default Frame;
