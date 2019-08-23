import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import CurtainsImage from '../components/CurtainsImage';
import CurtainsCanvas from '../components/CurtainsCanvas';


const CurtainsDemo = () => {

  return (
    <React.Fragment>
      <CurtainsCanvas canvasID="curtains-canvas" />
      <section>
        <CurtainsImage imgSrc="/mt1b.jpg" />
        <CurtainsImage imgSrc="/mt2b.jpg" />
        <CurtainsImage imgSrc="/photo2.jpg" />
        <CurtainsImage imgSrc="/photo3.jpg" />
        <CurtainsImage imgSrc="/photo1.jpg" />
        <CurtainsImage imgSrc="/photo4.jpg" />
        <CurtainsImage imgSrc="/photo5.jpg" />
        <CurtainsImage imgSrc="/photo6.jpg" />
      </section>
    </React.Fragment>
  );
};

export default CurtainsDemo;
