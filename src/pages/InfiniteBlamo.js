import React, { useState, useEffect } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import BlamoCanvas from '../components/BlamoCanvas';
import BlamoPhotos from '../components/BlamoPhotos';
import useIntersect from '../hooks/useIntersect';


const BodyStyle = createGlobalStyle`
  body {
    background-color: initial;
  }
`;

const Main = styled.main`
  position: relative;
`;

const NextTrigger = styled.div`
  position: absolute;
  height: 1px;
  width: 100%;
  z-index: 1;
  transition: transform 0.2s ease 0s;
  transform: translate(0px, ${props => props.y}px);
`

function InfiniteBlamo() {
  const [page, updatePage] = useState(1);
  const [nextTriggerRef, entry] = useIntersect({rootMargin: '0px'});

  useEffect( () => {
    if (entry.isIntersecting) {
      updatePage(p => p+1);
    }
  }, [updatePage, entry])

  return (
    <Main>
      <BodyStyle />
      <NextTrigger ref={nextTriggerRef} y={8000 * page} />
      <BlamoCanvas>
        <BlamoPhotos page={page} />
      </BlamoCanvas>
    </Main>
  );
}

export default InfiniteBlamo;
