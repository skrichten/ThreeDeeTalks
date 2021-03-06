import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useFrame } from 'react-three-fiber';
import useElement from '../hooks/useElement';

function ScissorScene({ children, elem, isMain, fov=55, cameraPos=[0,0,0], showAx, ...props }) {
  const scene = useRef();
  const camera = useRef();

  useFrame(({ gl }) => {
    const cam = camera.current;

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

    if (isMain) {
      gl.setScissorTest(false);
      gl.clear(true, true);
      gl.setScissorTest(true);
    }

    cam.aspect = width / height;
    cam.updateProjectionMatrix();

    const positiveYUpBottom = canvas.clientHeight - bottom;
    gl.setScissor(left, positiveYUpBottom, width, height);
    gl.setViewport(left, positiveYUpBottom, width, height);

    gl.render(scene.current, cam)
  }, 1);

  return (
    <scene ref={scene} {...props}>
      <perspectiveCamera
        ref={camera}
        fov={fov}
        position={cameraPos}
      />
      { showAx && <axesHelper position={[0, 0, -2]} /> }
      {children(camera.current)}

    </scene>
  )

}

ScissorScene.propTypes = {
  elem: PropTypes.instanceOf(Element),
  fov: PropTypes.number,
  isMain: PropTypes.bool,
  children: PropTypes.func.isRequired
}

export default ScissorScene;
