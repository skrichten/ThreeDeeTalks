import React, { useRef } from 'react';
import { useRender } from 'react-three-fiber';

function ScissorScene({ children, elem, isMain, ...props }) {
  const scene = useRef();
  const camera = useRef()

  useRender(({ gl }) => {
    const cam = camera.current;

    if (isMain) {
      gl.setScissorTest(false);
      gl.clear(true, true);
      gl.setScissorTest(true);
    }

    const {left, right, top, bottom, width, height} =
        elem.getBoundingClientRect();
    const canvas = gl.domElement;

    const isOffscreen =
        bottom < 0 ||
        top > canvas.clientHeight ||
        right < 0 ||
        left > canvas.clientWidth;

    if (isOffscreen) {
      return;
    }

    // I think For displaying images we need to set this based on the image
    // and also make sure the contianer element keeps the same aspect ratio

    //cam.aspect = width / height;
    //cam.radius = (width + height) / 4;
    cam.updateProjectionMatrix();

    const positiveYUpBottom = canvas.clientHeight - bottom;
    gl.setScissor(left, positiveYUpBottom, width, height);
    gl.setViewport(left, positiveYUpBottom, width, height);


    gl.render(scene.current, cam)
  }, isMain)

  return (
    <scene ref={scene} {...props}>
      <perspectiveCamera
        ref={camera}
        fov={55}
        position={[0, 0, 5]}
      />
      {children}
    </scene>
  )

}

export default ScissorScene;
