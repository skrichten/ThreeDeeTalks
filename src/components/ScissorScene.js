import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useRender } from 'react-three-fiber';
import useElement from '../hooks/useElement';

function ScissorScene({ children, elem, isMain, fov=55, ...props }) {
  const scene = useRef();
  //const [camera, cam] = useElement();
  //console.log('cam', cam)
  const camera = useRef();
  console.log('scene')

  useRender(({ gl }) => {
    const cam = camera.current;

    if (isMain) {
      gl.setScissorTest(false);
      gl.clear(true, true);
      gl.setScissorTest(true);
    }

    const {left, right, top, bottom, width, height} =
      elem.getBoundingClientRect();
    //console.log(width);
    const canvas = gl.domElement;

    const isOffscreen =
        bottom < 0 ||
        top > canvas.clientHeight ||
        right < 0 ||
        left > canvas.clientWidth;

    if (isOffscreen) {
      return;
    }

    cam.aspect = width / height;
    cam.updateProjectionMatrix();

    const positiveYUpBottom = canvas.clientHeight - bottom;
    gl.setScissor(left, positiveYUpBottom, width, height);
    gl.setViewport(left, positiveYUpBottom, width, height);

    gl.render(scene.current, cam)
  }, isMain);

  return (
    <scene ref={scene} {...props}>
      <perspectiveCamera
        ref={camera}
        fov={fov}
        position={[0, 0, 0]}
      />
      {camera.current && children(camera.current)}
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
