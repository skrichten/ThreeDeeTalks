import React, { useCallback, useEffect, useState } from 'react';
import {  useRender } from 'react-three-fiber';
import { useSpring } from 'react-spring/three';
import { Vector2, ShaderMaterial} from 'three';
import MatcapShader from '../resources/shaders/MatcapShader';
import { loadTexture, loadGLTF } from '../util/loaders';


const material = new ShaderMaterial( {
	uniforms: MatcapShader.uniforms,
	vertexShader: MatcapShader.vertShader,
	fragmentShader: MatcapShader.fragShader
} );

const matCaps = [
  new Vector2(0, 0),
  new Vector2(.5, 0),
  new Vector2(.5, .5),
  new Vector2(0, .5),
];

function loadFox() {
  return Promise.all([
    loadGLTF('./fox.glb'),
    loadTexture('./foxnormal.png'),
    loadTexture('./mcapcombo2.png')
  ]).then(([gltf, normTex, mcapTex]) => {
    //https://github.com/donmccurdy/aframe-extras/issues/167
    //https://github.com/mrdoob/three.js/issues/5644
    normTex.flipY = false;
    const model = gltf.scene;
    model.traverse( function ( child ) {
      if ( child.isMesh ) {

        child.material = material;
        const uni = child.material.uniforms;
        child.material.matcap = mcapTex;
        uni.matcap.value = mcapTex;
        child.material.normalMap = normTex;
        uni.normalMap.value = normTex;
        uni.u_map1Offset.value = matCaps[0];
        uni.u_map2Offset.value = matCaps[1];

        //child.material.normalScale = .01;
        //uni.normalScale.value = .01;
      }
    } );
    return model
  });
}

const Fox = ({ lookindex, ...props }) => {
  const [fox, setFox] = useState(false);
  const [aniState, setAniState] = useState({
    reset: false,
    currentIndex: 1,
    lastIndex: 0
  });

  useEffect(() =>  void loadFox().then(setFox), [setFox] );

  useEffect(() => {
    if (typeof lookindex == 'undefined') return;
    setAniState(prevState => {
      const nextIndex = lookindex;
      return {...prevState, reset: true,
        currentIndex: nextIndex, lastIndex: prevState.currentIndex };
    });
  }, [lookindex]);

  const { progress } = useSpring({
    progress: 1.01,
    from: {progress: 0},
    reset: aniState.reset,
    onRest: () => setAniState(prevState => ({...prevState, reset: false}) ),
    config: { mass: 2, tension: 100, friction: 20 }
  });

  const onClick = useCallback(() => {
    setAniState(prevState => {
      const nextIndex = prevState.currentIndex >= matCaps.length-1
        ? 0 :  prevState.currentIndex + 1;
      return {...prevState, reset: true,
        currentIndex: nextIndex, lastIndex: prevState.currentIndex };
    });
  }, [setAniState])


  useRender(() => {
    if (progress.value > 1) return;
    const uni = material.uniforms;
    uni.u_map1Offset.value = matCaps[aniState.lastIndex];
    uni.u_map2Offset.value = matCaps[aniState.currentIndex];
    uni.u_blendPos.value = progress.value;
  }, false, [aniState]);

  return (
    fox ? (
      <primitive object={fox} onClick={onClick} {...props}  />
    )
    : null
  )

}

export default Fox;
