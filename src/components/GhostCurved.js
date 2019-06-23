import React, { useEffect, useState, useCallback } from 'react';
import { Vector2, Color, ShaderMaterial } from 'three';
import {  useRender } from 'react-three-fiber';
import { useSpring, animated as a } from 'react-spring/three';
import MatcapShader from '../resources/shaders/MatcapShader';
import { loadTexture, loadGLTF } from '../util/loaders';

const material = new ShaderMaterial( {
	uniforms: MatcapShader.uniforms,
	vertexShader: MatcapShader.vertShader,
	fragmentShader: MatcapShader.fragShader
} );

material.transparent = true;
material.opacity = .2;
material.color = new Color( 0x62ff49 );

const matCaps = [
  new Vector2(0, 0),
  new Vector2(.5, 0),
  new Vector2(.5, .5),
  new Vector2(0, .5),
];

function loadGhost() {
  return Promise.all([
    loadGLTF('./ghostCurved.glb'),
    loadTexture('./mcapcombo3.png')
  ]).then( ([gltf, mcapTex]) => {
    const model = gltf.scene;
    model.traverse( function ( child ) {
      if ( child.isMesh ) {
        child.material = material;
        const uni = child.material.uniforms;
        child.material.matcap = mcapTex;
        uni.matcap.value = mcapTex;
        uni.opacity.value = .85;

        uni.u_map1Offset.value = matCaps[0];
        uni.u_map2Offset.value = matCaps[1];
      }
    })
    return model;
  })
}

function GhostCurved({ lookIndex, ...props }) {
  const [ghost, setGhost] = useState(false);
  const [aniState, setAniState] = useState({
    reset: false,
    currentIndex: 1,
    lastIndex: 0
  });

  useEffect(() =>  void loadGhost().then(setGhost), [setGhost] );

  useEffect(() => {
    if (typeof lookIndex == 'undefined') return;
    setAniState(prevState => {
      const nextIndex = lookIndex;
      return {...prevState, reset: true,
        currentIndex: nextIndex, lastIndex: prevState.currentIndex };
    });
  }, [lookIndex]);

  const { progress } = useSpring({
    progress: 1.01,
    from: {progress: 0},
    reset: aniState.reset,
    onRest: () => setAniState(prevState => ({...prevState, reset: false}) ),
    config: { mass: 2, tension: 70, friction: 20 }
  });

  const onClick = useCallback(() => {
    setAniState(prevState => {
      const nextIndex = prevState.currentIndex >= matCaps.length-1
        ? 0 :  prevState.currentIndex + 1;
      return {...prevState, reset: true,
        currentIndex: nextIndex, lastIndex: prevState.currentIndex };
    });
  }, [setAniState]);

  const bobSpring = useSpring({
    from: {pos: [0, -.03, 0]},
    pos: [0, .03, 0],
    config: {
      mass: 3,
      tension: 7,
      friction: 0
    }
  })

  useRender(() => {
    if (progress.value > 1) return;
    const uni = material.uniforms;
    uni.u_map1Offset.value = matCaps[aniState.lastIndex];
    uni.u_map2Offset.value = matCaps[aniState.currentIndex];
    uni.u_blendPos.value = progress.value;
  }, false, [aniState]);

  return (
    ghost ? (
      <a.primitive
        object={ghost}
        onClick={onClick}
        position={bobSpring.pos}
        {...props}
      />
    )
    : <mesh />
  )
}

export default GhostCurved;

