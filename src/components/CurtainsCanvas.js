import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Curtains } from 'curtainsjs';
import { useCurtainsStore } from '../hooks/useCurtainsStore';

const CanvasWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom:0;
  left: 0;
  height: 100vh;
  z-index: -2;
`;

const CurtainsCanvas = ({ canvasID }) => {
  const {setCurtains} = useCurtainsStore();

  useEffect(() => {
    const curtains = new Curtains(canvasID);
    setCurtains(curtains);
    curtains.onRender(() => {
      curtains.container.style.transform = `translateY(${window.scrollY}px)`;
    })
  }, [setCurtains, canvasID])

  return (
      <CanvasWrap id={canvasID} />
  );
};

export default CurtainsCanvas;
