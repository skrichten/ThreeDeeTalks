import React, { Suspense, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { getScrollHeight } from '../util/dom';

const WebGLContent = React.lazy(() => import('../components/Outline/WebGLContent'));

const Main = styled.main`
  background: #fff;
`;

const WorkSection = styled.div`
  height: 5000px;
  margin-bottom: 100px;
`;

const AboutSection = styled.div`
  height: 3100px;
  text-align: center;
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
  margin: 0 0 100px 0;
  position: relative;
  z-index: 2;
`;

const TeamPHImage = styled.img`
  position: relative;
`;

const Outline = () => {
  const [loaded, setLoaded] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const heroRef = useRef();
  const teamRef = useRef();

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


  // Need to start from top of page so let's force it.
  // Needs a delay because Chrome tries to force scroll restoration.
  useEffect(() => void window.setTimeout(() => window.scrollTo(0,0), 50), []);


  /* Attempt at lazy loading, but not very effective.
  Three.js ends up getting bundled with the initial site load becuase
  it is used in other pages that are not lazy loaded.
  Need to find a way to bundle three.js separately.
  */
  useEffect(() => {
    if (!loaded) setLoaded(true)
  }, [loaded, setLoaded]);


  const [aboutRef, aboutInView] = useInView({
    rootMargin: '50px'
  });

  const [workRef, workInView] = useInView({
    rootMargin: '50px'
  });

  return (
    <Main>
      { loaded &&
        <Suspense fallback={null}>
          <WebGLContent
            topOffset={topOffset}
            aboutInView={aboutInView}
            workInView={workInView}
            teamElement={teamRef.current}
          />
        </Suspense>
      }
      <ContentWrap>
        <Hero ref={heroRef}>
          <Title>Hero</Title>
        </Hero>
        <WorkSection ref={workRef} />
        <AboutSection ref={aboutRef}>
          <Title>
          Ugly birds, beautiful ideas
          </Title>
          <TeamPHImage
            ref={teamRef}
            src="/team-ph.png"
            alt="Our Team"
          />
        </AboutSection>
      </ContentWrap>
    </Main>
  )
};

export default Outline;

