import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Curtains } from 'curtainsjs';
import { useCurtainsStore } from '../hooks/useCurtainsStore';

const CanvasWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom:0;
  left: 0;
  z-index: -1;
`;

const CurtainsCanvas = ({ canvasID }) => {
  const {setCurtains} = useCurtainsStore();

  useEffect(() => {
    const curtains = new Curtains(canvasID);
    setCurtains(curtains);
  }, [setCurtains])

  return (
      <CanvasWrap id={canvasID} />
  );
};

export default CurtainsCanvas;
