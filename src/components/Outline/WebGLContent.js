import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Color } from 'three';
import { Dom } from 'react-three-fiber';
import Camera from '../Camera';
import ThreeCanvas from '../ThreeCanvas';
import Scene from './Scene';
import TeamContent from './TeamIntegrated';

const Stage = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: 1;
`;

const devicePixelRatio = window.devicePixelRatio.toFixed(2);

const WebGLContent = ({
  topOffset,
  aboutInView,
  workInView,
  teamElement,
}) => {

  const onInit = ({ scene }) => {
    scene.background = new Color(0xffffff);
  };

  return (
    <Stage>
      <ThreeCanvas
        pixelRatio={devicePixelRatio}
        onCreated={onInit}
      >
        <Camera position={[0, 0, 25]} fov={65} far={50} />
        <Suspense fallback={<Dom center>loading...</Dom>}>
          <Scene topOffset={topOffset} showDom={!aboutInView} active={workInView} />
          {aboutInView && <TeamContent trackElement={teamElement} />}
        </Suspense>
      </ThreeCanvas>
    </Stage>
  )
};

export default WebGLContent;

