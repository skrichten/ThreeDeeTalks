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
  width: 100%;
  height: 500px;
`;

const PhImage = styled.img`
  width: 100%;
  max-width: 800px;
  display: block;
  margin: 50px auto;
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
        <ScissorScene elem={el1} isMain={true}>
          {camera => (
            <DistortedImage img={el1} camera={camera} />
          )}
        </ScissorScene>
        <ScissorScene elem={el2}>
          {camera => (
            <DistortedImage img={el2} camera={camera} />
          )}
        </ScissorScene>
        <ScissorScene elem={el3}>
          {camera => (
            <mesh position={[0, 0, -2]}>
              <dodecahedronBufferGeometry attach="geometry" args={[0.5]} />
              <meshNormalMaterial attach="material" />
            </mesh>
          )}
        </ScissorScene>
        <ScissorScene elem={el4}>
          {camera => (
            <DistortedImage img={el4} camera={camera} />
          )}
        </ScissorScene>
    </ThreeCanvas>
    <Section>
      <PhImage src="/photo1.jpg" ref={r1} />
      <PhImage src="/photo2.jpg" ref={r2} />
      <GlRect ref={r3} />
      <PhImage src="/photo3.jpg" ref={r4} />
    </Section>
  </React.Fragment>
  )
};

export default Multiple;

