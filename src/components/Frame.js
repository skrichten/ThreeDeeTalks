import React, { useEffect, useState, useCallback } from 'react';
import { MeshBasicMaterial } from 'three';
import { loadGLTF } from '../util/loaders';

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

function Frame(props) {
  const [frame, setFrame] = useState(false);
  useEffect(() =>  void loadFrame().then(setFrame), [setFrame] );

  return (
    frame ? (
      <primitive object={frame} {...props} />
    )
    : <mesh />
  )

}

export default Frame;
