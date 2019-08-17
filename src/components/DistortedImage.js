import React, { useMemo, useRef } from 'react';
import { MeshBasicMaterial } from 'three';
import { useSpring, animated as a } from 'react-spring/three';
import { useRender } from 'react-three-fiber';
import { TextureLoader } from 'three';
import WaveFadeShader from '../resources/shaders/WaveFadeShader';

const getImageSize = (w, h, max) => {
  const ratio = Math.min(max.w / w, max.h / h);
  return [w * ratio, h * ratio, 1];
}

function DistortedImage({ elem, imgData, ...props }) {
  const material = useRef();

  const uniforms = useMemo(() => {
    return {
      u_progress: { type: "f", value: .7 },
      u_tex: { type: "t", value: new TextureLoader().load(elem.src) }
    }
  }, [elem]);

  const fillFactor = .98;
  const distFromCam = -1

  // Need to pass camera in from the ScissorScene
  const camera = {
    fov: 55, aspect: 1
  }

  const viewSize = useMemo(() => {
    const fovInRadians = (camera.fov * Math.PI) / 180;
    const height = Math.abs(
      fillFactor * distFromCam * Math.tan(fovInRadians / 2) * 2,
    );
    return { w: height * camera.aspect, h: height };
  }, [camera.aspect, camera.fov, fillFactor, distFromCam]);

  const size = useMemo(() => {
    // How should we get image size?
    return getImageSize(1024, 1024, viewSize);
  }, [elem, viewSize])


  useRender( () => {

  }, false, [ ]);

  return (
    <a.mesh position={[0, 0, distFromCam]} >
      <planeBufferGeometry attach="geometry" args={ size } />
      <shaderMaterial attach="material"
        ref={material}
        vertexShader={WaveFadeShader.vertShader}
        fragmentShader={WaveFadeShader.fragShader}
        uniforms={uniforms}
        transparent
      />
    </a.mesh>
  );

}

export default DistortedImage;
