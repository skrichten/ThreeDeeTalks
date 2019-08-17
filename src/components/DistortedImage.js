import React, { useMemo, useRef, useState } from 'react';
import { useSpring, animated as a } from 'react-spring/three';
import { TextureLoader } from 'three';
import WaveFadeShader from '../resources/shaders/WaveFadeShader';

function DistortedImage({ img, camera, ...props }) {
  const material = useRef();
  const fillFactor = 1;
  const distFromCam = -1;

  const planeSize = useMemo(() => {
    const fovInRadians = (camera.fov * Math.PI) / 180;;
    const height = Math.abs(
      fillFactor * distFromCam * Math.tan(fovInRadians / 2) * 2,
    );
    return [ height * camera.aspect, height, 1 ];
  }, [camera.aspect, fillFactor, distFromCam]);

  const uniforms = useMemo(() => {
    return {
      u_progress: { type: "f", value: .7 },
      u_tex: { type: "t", value: new TextureLoader().load(img.src) }
    }
  }, [img]);

  return (
    <mesh position={[0, 0, distFromCam]} >
      <planeBufferGeometry attach="geometry" args={ planeSize } />
      <shaderMaterial attach="material"
        ref={material}
        vertexShader={WaveFadeShader.vertShader}
        fragmentShader={WaveFadeShader.fragShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );

}

export default DistortedImage;
