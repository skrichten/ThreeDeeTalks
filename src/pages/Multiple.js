import React, { useCallback, useState, useRef } from 'react';
import styled from 'styled-components';
import useElement from '../hooks/useElement';
import ScissorScene from '../components/ScissorScene';
import ThreeCanvas from '../components/ThreeCanvas';
import DistortedImage from '../components/DistortedImage';

const Section = styled.section`
  position: relative;
`;

const GlRect = styled.div`
  width: 30%;
  height: 500px;
  margin: 0 auto 300px;
`;

const PhImage = styled.img`
  width: 100%;
  max-width: 800px;
  display: block;
  margin: 50px auto;
  opacity: .1;
  /** visibility: hidden; **/
`;

const devicePixelRatio = window.devicePixelRatio.toFixed(1);

const Multiple = () => {
  const [r1, el1] = useElement();
  const [r2, el2] = useElement();
  const [r3, el3] = useElement();
  const [r4, el4] = useElement();

  return (
    <React.Fragment>
    <ThreeCanvas pixelRatio={devicePixelRatio}>
        <axesHelper position={[0, 0, -2]} />
        <ScissorScene elem={el4} isMain={true} showAx={false}>
          {camera => (
            <mesh position={[0, 0, -2]}>
              <sphereGeometry attach="geometry" args={[.4, 64, 64]} />
              <meshNormalMaterial attach="material" />
            </mesh>
          )}
        </ScissorScene>
        <ScissorScene elem={el3} showAx={true}>
          {camera => (
            <mesh position={[0, 0, -2]}>
              <dodecahedronBufferGeometry attach="geometry" args={[0.7]} />
              <meshNormalMaterial attach="material" />
            </mesh>
          )}
        </ScissorScene>
    </ThreeCanvas>
    <Section>
      <GlRect ref={r4} />
      <GlRect ref={r3} />
    </Section>
  </React.Fragment>
  )
};

export default Multiple;

