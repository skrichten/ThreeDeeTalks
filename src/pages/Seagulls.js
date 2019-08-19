import React, { useRef, useEffect } from 'react';
import { Canvas, useRender, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import styled from 'styled-components';
import useMouseSpring from '../hooks/useMouseSpring';

// Adapted from https://threejs.org/examples/#webgl_buffergeometry_instancing_billboards
// Seagull icon by Bakunetsu Kaito
// https://thenounproject.com/term/seagull/1034185/

const vertShader = `
  precision highp float;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float time;

  attribute vec3 position;
  attribute vec2 uv;
  attribute vec3 translate;

  varying vec2 vUv;
  varying float vScale;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( translate, 1.0 );
    vec3 trTime = vec3(translate.x + time, translate.y + time, translate.z + time);
    float scale =  clamp(sin( trTime.x * 2.1 ) + sin( trTime.y * 3.2 ) + sin( trTime.z * 4.3 ), 0.2, 4.0);
    vScale = scale;
    scale = scale * 10.0 + 10.0;
    mvPosition.xyz += position * scale;
    vUv = uv;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragShader = `
  precision highp float;

  uniform sampler2D map;

  varying vec2 vUv;
  varying float vScale;

  void main() {
    vec4 diffuseColor = texture2D( map, vUv );
    //float val = clamp(diffuseColor.x * vScale/1.0, 0.99, 1.0 );
    //float val = clamp(diffuseColor.x * vScale/0.5, 0.0, 0.1 );
    float val =  vScale * 0.03;
    gl_FragColor = vec4( val, val, val, diffuseColor.w );
    if ( diffuseColor.w < 0.5 ) discard;
  }
`;

const uniforms = {
  map: { value: new THREE.TextureLoader().load( "./seagull.png" ) },
  time: { type: "f", value: 0.0 }
}

function Flock() {
  const {scene} = useThree();
  scene.background = new THREE.Color( 0x000000 );

  const mainRef = useRef();
  const instRef = useRef();
  const matRef = useRef();

  const [{mouse}] = useMouseSpring({precision: .001, mass: 4, tension:50});

  let it;
  let pt;
  it = pt = performance.now();
  useRender(() => {
    if (!matRef.current) return;
    const uni = matRef.current.uniforms;
    const t = performance.now() * 0.0005;
    uni.time.value = t;

    // Maybe use something like this to track performance ?
    it = performance.now();
    console.log( it - pt );
    pt = it;


    const mpos = mouse.payload;
    const r = mainRef.current.rotation;
    const x = r.x + (-.01 + (mpos[1].value * .02));
    const y = r.y + (-.01 + (mpos[0].value * .02));
    const z = t * .4;
    mainRef.current.rotation.set(x, y, z);
  }, false, [matRef, mainRef, mouse]);

  useEffect(() => {
    if (!instRef || !instRef.current) return;
    instRef.current.copy( new THREE.PlaneBufferGeometry( .03, .03 ) );
    const particleCount = 500;

    /**
     This array is data that will be passed to the vertex shader as a custom attribute
      It holds a vec3 for each "particle" and is used as part of the calculation of position and scale of each particle
      The color of each particle is determined by the scale, so this data indirectly affects color as well
      **/
    const translateArray = new Float32Array( particleCount * 3 );

    for ( var i = 0, i3 = 0, l = particleCount; i < l; i ++, i3 += 3 ) {
      translateArray[ i3 + 0 ] = Math.random() * 2 - 1;
      translateArray[ i3 + 1 ] = Math.random() * 2 - 1;
      translateArray[ i3 + 2 ] = Math.random() * 2 - 1;
    }

    instRef.current.addAttribute( "translate",
      new THREE.InstancedBufferAttribute( translateArray, 3, true, 1 ) );

  }, [instRef]);

  return (
    <mesh ref={mainRef} scale={[7, 7, 7]}>
      <instancedBufferGeometry ref={instRef} attach="geometry" />
      <rawShaderMaterial attach="material"
        ref={matRef}
        vertexShader={vertShader}
        fragmentShader={fragShader}
        uniforms={uniforms}
        depthTest = {true}
        depthWrite = {true}
        transparent = {false}
      />
    </mesh>
  )
}

const Stage = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: 1;
`;

const glConfig = {
  gammaInput: true,
  gammaOutput:true,
};

const devicePixelRatio = window.devicePixelRatio.toFixed(1);

function Seagulls() {
  return (
    <main>
      <Stage>
        <Canvas gl={glConfig} pixelRatio={devicePixelRatio} >
          <Flock />
        </Canvas>
      </Stage>
    </main>
  );
}

export default Seagulls;
