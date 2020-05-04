import React, { Suspense, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { getScrollHeight } from '../util/dom';

const WebGLContent = React.lazy(() => import('../components/Outline/WebGLContent'));

const WorkSection = styled.div`
  height: 5000px;
`;
const AboutSection = styled.div`
  height: 4000px;
  position: relative;
  z-index: 2;
`;

const ContentWrap = styled.div`
  position: relative;
`;

const Hero = styled.div`
  height: 1000px;
  background: #f2f2f2;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  margin: 0;
`

const Outline = () => {
  const [loaded, setLoaded] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const heroRef = useRef();

  /* Gets the top scroll offset based on the height of the hero
  This way the work section can adjust when it starts moving the items.
  */
  useEffect(() => {
    if (!heroRef.current) return;

    const updateTopOffset = () => {
      const scrollHeight = getScrollHeight();
      const rect = heroRef.current.getBoundingClientRect();
      setTopOffset(rect.height / scrollHeight);
    }

    global.addEventListener('resize', updateTopOffset);
    updateTopOffset();
    return () => global.removeEventListener('resize', updateTopOffset);
  }, [setTopOffset]);


  /* Attempt at lazy loading, but not very effective.
  Three.js ends up getting bundled with the initial site load becuase
  it is used in other pages that are not lazy loaded.
  Need to find a way to bundle three.js separately.
  */
  useEffect(() => {
    if (!loaded) setLoaded(true)
  }, [loaded, setLoaded]);

  const [aboutRef, aboutInView] = useInView({
    rootMargin: '250px',
  });

  const [workRef, workInView] = useInView({
    rootMargin: '250px',
  });

  console.log('aboutInView:', aboutInView)
  console.log('workInView:', workInView)

  return (
    <main>
      { loaded &&
        <Suspense fallback={null}>
          <WebGLContent topOffset={topOffset} />
        </Suspense>
      }
      <ContentWrap>
        <Hero ref={heroRef}>
          <Title>Hero</Title>
        </Hero>
        <WorkSection ref={workRef} />
        <AboutSection ref={aboutRef}>
          <Title>About</Title>
        </AboutSection>
      </ContentWrap>
    </main>
  )
};

export default Outline;

