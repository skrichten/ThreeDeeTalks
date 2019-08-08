import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { bp } from '../styles/helpers';
import screen from 'superior-mq';
import Grid from '../components/Grid';
import ScissorScene from '../components/ScissorScene';
import ThreeCanvas from '../components/ThreeCanvas';

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

const WinnersSection = styled.section`
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

const WinnersGridItem = styled(Grid.Item)`
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

const Multiple = () => {
  const [el1, setEl1] = useState(null);
  const [el2, setEl2] = useState(null);

  const r1 = useCallback(node => {
    if (node !== null) setEl1(node);
  },[]);

  const r2 = useCallback(node => {
    if (node !== null) setEl2(node);
  },[]);

  return (
    <React.Fragment>
    <ThreeCanvas>
        <ScissorScene elem={el1} isMain={true}>
          <mesh>
            <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
            <meshBasicMaterial attach="material" color="lightgreen" />
          </mesh>
        </ScissorScene>
        <ScissorScene elem={el2}>
          <mesh position={[0, 0, 0]}>
            <dodecahedronBufferGeometry attach="geometry" args={[0.5]} />
            <meshNormalMaterial attach="material" />
          </mesh>
        </ScissorScene>
    </ThreeCanvas>
    <WinnersSection>
      <Container>
        <Grid styles={gridStyles}>
          <WinnersGridItem span={1}>
            <GlRect ref={r1} />
          </WinnersGridItem>
          <WinnersGridItem span={1}>
            <GlRect ref={r2} />
          </WinnersGridItem>
          <WinnersGridItem span={1}>
            <GlRect />
          </WinnersGridItem>
          <WinnersGridItem span={1}>
            <GlRect />
          </WinnersGridItem>
        </Grid>
      </Container>
    </WinnersSection>
  </React.Fragment>
  )
};

export default Multiple;

