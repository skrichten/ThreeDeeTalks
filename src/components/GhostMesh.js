import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const mat = new THREE.MeshMatcapMaterial();
mat.transparent = true;
mat.opacity = .6;
mat.color = new THREE.Color( 0x62ff49 );

function loadTexture(url) {
  return new Promise(resolve => {
    return new THREE.TextureLoader().load( url, resp => resolve(resp));
  });
}

function loadModel (url) {
  return new Promise(resolve => {
    new GLTFLoader().load(url, resp =>  resolve(resp.scene));
  });
}

function loadGhost() {
  return Promise.all([
    loadModel('./ghost.glb'),
    loadTexture('./gmatcap.png')
  ]).then( ([model, tex]) => {
      model.traverse( function ( child ) {
        if ( child.isMesh ) {
          child.material = mat;
          child.material.matcap = tex;
        }
      })
      return model;
    })
}

function GhostMesh() {
  const [ghost, setGhost] = useState(false);
  useEffect(() =>  void loadGhost().then(setGhost), [setGhost] );

  return (
    ghost ? (
      <primitive object={ghost}>
        <pointLight args={[0x62ff49, .4, 2.5 ]} />
      </primitive>
    )
    : <mesh />
  )
}

export default GhostMesh;

