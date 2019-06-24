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

const colors = ['#0d141a', '#0D1400', '#14072A', '#000000'];
const config = {
  mass: 1,
  tension: 70,
  friction: 26,
  precision: .01
}

// Just a simple background Div that changes color based on the lookIndex
function GDogBackground({ lookIndex }) {
  const style = useSpring({ background: colors[lookIndex], config });

  return (
    <BG style={style} />
  )
}

export default GDogBackground;
