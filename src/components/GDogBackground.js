import React from 'react';
import { useSpring, animated as a } from 'react-spring';
import styled from 'styled-components';

const BG = styled(a.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: -2;
  background-color: #fff;
`;

const colors = ['#1B1D24', '#0D1400', '#14072A', '#000000'];

function GDogBackground({ lookIndex }) {
  const style = useSpring({ background: colors[lookIndex] });

  return (
    <BG style={style} />
  )
}

export default GDogBackground;
