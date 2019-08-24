import React from 'react';
import styled from 'styled-components';
import CurtainsImage from '../components/CurtainsImage';
import CurtainsCanvas from '../components/CurtainsCanvas';

const ImgGrid = styled.section`
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 50px;
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
        <CurtainsImage imgSrc="/mt1b.jpg" imgWidth={300} imgHeight={200} />
        <CurtainsImage imgSrc="/mt2b.jpg" imgWidth={300} imgHeight={200} />
        <CurtainsImage imgSrc="/mt1.jpg" imgWidth={300} imgHeight={200} />
        <CurtainsImage imgSrc="/photo2.jpg" imgWidth={200} imgHeight={200} />
        <CurtainsImage imgSrc="/photo3.jpg" imgWidth={200} imgHeight={200} />
        <CurtainsImage imgSrc="/photo1.jpg" imgWidth={200} imgHeight={200} />
        <CurtainsImage imgSrc="/photo4.jpg" imgWidth={200} imgHeight={200} />
        <CurtainsImage imgSrc="/photo5.jpg" imgWidth={200} imgHeight={200} />
        <CurtainsImage imgSrc="/photo6.jpg" imgWidth={200} imgHeight={200} />
      </ImgGrid>
    </React.Fragment>
  );
};

export default CurtainsDemo;
