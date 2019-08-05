import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSpring, animated as a } from 'react-spring';

const config = {
  mass: 1, tension: 3, friction: 0, precision: 0.01,
};

const Distorted = styled.img`
  filter: url(#wavedfilter);
`;

function DistortedImage({ strength = 70 }) {

  const AnimFeTurbulence = a('feTurbulence');
  const AnimFeDisplacementMap = a('feDisplacementMap');
  const AnimFeGaussianBlur = a('feGaussianBlur');

  const from = { freq:'0.002, 0.007', disp: 0, blur: 0 };
  const to = { freq:'0.003, 0.009', disp: strength, blur: .5 };
  const {freq, disp, blur} = useSpring( { from, to, config } );

  return (
    <React.Fragment>
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" >
      <defs>
        <filter id="wavedfilter">
          <AnimFeTurbulence type="turbulence" baseFrequency={freq}
            numOctaves="1" type="fractalNoise" result="turbulence"/>

          <AnimFeDisplacementMap in="SourceGraphic" in2="turbulence"
            scale={disp} xChannelSelector="R" yChannelSelector="R"
            result="distored"
          />
          <AnimFeGaussianBlur in="distored" stdDeviation={blur} />
        </filter>
      </defs>
    </svg>
    <Distorted src="https://picserio.com/data/out/8/dark-black-wallpaper_2334616.jpg" alt="" />
    </React.Fragment>
  )
}

export default DistortedImage;
