import React from 'react';
import styled from 'styled-components';
import CurtainsImage from '../components/CurtainsImage';
import CurtainsCanvas from '../components/CurtainsCanvas';

const ImgGrid = styled.section`
  display: grid;
  grid-column-gap: 30px;
  grid-template-columns: repeat(1, 1fr);
  width: 85%;
  margin: 0 auto;

  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CurtainsDemo = () => {

  return (
    <React.Fragment>
      <CurtainsCanvas canvasID="curtains-canvas" />
      <ImgGrid>
        <CurtainsImage imgSrc="/mt1b.jpg" />
        <CurtainsImage imgSrc="/mt2b.jpg" />
        <CurtainsImage imgSrc="/mt1.jpg" imgWidth="100%" />
        <CurtainsImage imgSrc="/photo2.jpg" domOpacity={.4} imgWidth="80%" />
        <CurtainsImage imgSrc="/photo3.jpg" imgWidth="80%" />
        <CurtainsImage imgSrc="/photo1.jpg" imgWidth="80%" />
        <CurtainsImage imgSrc="/photo4.jpg" imgWidth="80%" />
        <CurtainsImage imgSrc="/photo5.jpg" imgWidth="80%" />
        <CurtainsImage imgSrc="/photo6.jpg" imgWidth="80%" />
      </ImgGrid>
    </React.Fragment>
  );
};

export default CurtainsDemo;
