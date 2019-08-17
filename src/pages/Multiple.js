import React, { useCallback, useState, useRef } from 'react';
import styled from 'styled-components';
import { bp } from '../styles/helpers';
import screen from 'superior-mq';
import Grid from '../components/Grid';
import useElement from '../hooks/useElement';
import ScissorScene from '../components/ScissorScene';
import ThreeCanvas from '../components/ThreeCanvas';
import DistortedImage from '../components/DistortedImage';

const Container = styled.div`
  max-width: var(--container);
  margin: auto;
  padding: 0 20px;
`;

const gridStyles = `
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 168px 200px;

  ${screen.below(bp.desktopSm, `
    grid-gap: 126px 150px;
  `)}

  ${screen.below(bp.laptopSm, `
    grid-gap: 84px 100px;
  `)}

  ${screen.below(bp.tablet, `
    grid-gap: 42px 50px;
  `)}

  ${screen.below(bp.mobile, `
    grid-template-columns: 1fr;
  `)}
`;

const Section = styled.section`
  position: relative;
  padding-bottom: 702px;
  overflow: hidden;

  ${screen.below(bp.desktopSm, `
    padding-bottom: 526px;
  `)}

  ${screen.below(bp.laptopSm, `
    padding-bottom: 350px;
  `)}

  ${screen.below(bp.tablet, `
    padding-bottom: 175px;
  `)}
`;

const GridItem = styled(Grid.Item)`
  &:nth-of-type(2n) {
    ${screen.above(bp.desktopSm, `
      margin-top: 320px;
    `)}

    ${screen.between(bp.laptopSm, bp.desktopSm, `
      margin-top: 240px;
    `)}

    ${screen.between(bp.mobile, bp.laptopSm, `
      margin-top: 160px;
    `)}
  }
`;

const GlRect = styled.div`
  width: 100%;
  height: 500px;
`;

const PhImage = styled.img`
  max-width: 300px;
  /*visibility: hidden; */
`

const Multiple = () => {
  const [r1, el1] = useElement();
  const [r2, el2] = useElement();

  return (
    <React.Fragment>
    <ThreeCanvas>
        <ScissorScene elem={el1} isMain={true}>
          <DistortedImage elem={el1} />
        </ScissorScene>
        <ScissorScene elem={el2}>
          <mesh position={[0, 0, -2]}>
            <dodecahedronBufferGeometry attach="geometry" args={[0.5]} />
            <meshNormalMaterial attach="material" />
          </mesh>
        </ScissorScene>
    </ThreeCanvas>
    <Section>
      <Container>
        <Grid styles={gridStyles}>
          <GridItem span={1}>
            <PhImage src="/photo1.jpg" ref={r1} />
          </GridItem>
          <GridItem span={1}>
            <PhImage src="/photo2.jpg" ref={r2} />
          </GridItem>
          <GridItem span={1}>
            <GlRect />
          </GridItem>
          <GridItem span={1}>
            <GlRect />
          </GridItem>
        </Grid>
      </Container>
    </Section>
  </React.Fragment>
  )
};

export default Multiple;

