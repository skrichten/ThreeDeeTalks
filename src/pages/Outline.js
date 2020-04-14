import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';

const WebGLContent = React.lazy(() => import('../components/Outline/WebGLContent'));

const Main = styled.main`
  height: 12000px;
`;

const ContentWrap = styled.div`
  position: relative;
`;

const Hero = styled.div`
  height: 1000px;
  background: #f2f2f2;
`;

const Title = styled.h1`
  margin: 0;
`

const Outline = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    const onmove = () => {
      setLoaded(true);
      global.removeEventListener('mousemove', onmove);
    }

    global.addEventListener('mousemove', onmove);
    return () => global.removeEventListener('mousemove', onmove);
  }, [loaded, setLoaded]);

  return (
    <Main>
      { loaded &&
        <Suspense fallback={null}>
          <WebGLContent />
        </Suspense>
      }
      <ContentWrap>
        <Hero>
          <Title>Hero</Title>
        </Hero>
      </ContentWrap>
    </Main>
  )
};

export default Outline;

