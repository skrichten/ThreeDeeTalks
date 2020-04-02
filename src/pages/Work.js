import React, { useRef, Suspense } from 'react';
import styled from 'styled-components';
import { Color, FogExp2 } from 'three';
import { Dom } from 'react-three-fiber';
import Camera from '../components/Camera';
import ThreeCanvas from '../components/ThreeCanvas';
import Scene from '../components/Work/Scene';

const Main = styled.main`
  height: 4000px;
`;

const Stage = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: 1;
`;

const devicePixelRatio = window.devicePixelRatio.toFixed(1);

const Work = () => {

  const onInit = ({ scene, gl }) => {
    scene.background = new Color(0xffffff);
    //scene.fog = new FogExp2(0xffffff, 0.05);
  };

  return (
    <Main>
      <Stage>
        <ThreeCanvas
          pixelRatio={devicePixelRatio}
          onCreated={onInit}
        >
          <Camera position={[0, .5, 25]} fov={65} />
          <Suspense fallback={<Dom center>loading...</Dom>}>
            <Scene />
          </Suspense>
        </ThreeCanvas>
      </Stage>
    </Main>
  )
};

export default Work;

