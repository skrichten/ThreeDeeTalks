import React, { useEffect, useState } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

const mat = new THREE.MeshMatcapMaterial();
mat.transparent = true;
mat.opacity = .8;
mat.color = new THREE.Color( 0x62ff49 );

function loadTexture(url) {
  return new Promise(resolve => {
    return new THREE.TextureLoader().load( url, resp => resolve(resp));
  });
}

function loadModel (url) {
  return new Promise(resolve => {
    new OBJLoader().load(url, resp =>  resolve(resp));
  });
}

function loadGhost() {
  return Promise.all([
    loadModel('./ghost.obj'),
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

function GhostGeo(props) {
  const [ghost, setGhost] = useState(false);
  useEffect(() =>  void loadGhost().then(setGhost), [setGhost] );

  return (
    ghost ? (
        <primitive object={ghost} attach="geometry" />
    )
    : null
  )
}

export default GhostGeo;

