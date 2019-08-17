import React from 'react';
import styled from 'styled-components';
import { useSpring, animated as a } from 'react-spring';

const ImageWrap = styled.div`

`;

const Distorted = styled.img`
  margin: 40px;
  width: 400px;
  filter: url(#wavedfilter);
`;

function DistortedImage({ strength = 30 }) {

  const AnimFeTurbulence = a('feTurbulence');

 const interp = i => r => `
  ${ 0.006 + (0.004 * Math.cos(r + ( 2 * Math.PI) )) },
  ${ 0.006 + (0.004 * Math.sin(r + ( 2 * Math.PI) )) }
`

 const { radians } = useSpring({
    to: async next => {
      while (1) await next({ radians: 2 * Math.PI })
    },
    from: { radians: 0 },
    config: { duration: 10000 },
    reset: true,
  });

  return (
    <React.Fragment>
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" >
      <defs>

        <filter id="wavedfilter">

          <AnimFeTurbulence
            baseFrequency={
              radians.interpolate(interp(1))
            }
            numOctaves="1" type="fractalNoise" result="turbulence"
          />

          <feDisplacementMap in="SourceGraphic" in2="turbulence"
            scale={strength} xChannelSelector="R" yChannelSelector="R"
            result="distored"
          />
          <feGaussianBlur stdDeviation=".7" />


        </filter>
      </defs>

    </svg>
    <Distorted src="https://cdn.dribbble.com/users/119367/screenshots/5490795/monstermash_mocktober_2x.jpg" alt="" />
    </React.Fragment>
  )
}

export default DistortedImage;

/*
<filter id="wavedfilter">
          <feImage xlinkHref={`data:image/svg+xml;charset=UTF-8,
            <svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'>
             <circle cx='120' cy='120' r='40' fill='white'/>
             </svg>`}
            result="arrow"
          />

          <feGaussianBlur in="arrow" result="blurcirc" stdDeviation="20" />

          <AnimFeTurbulence
            baseFrequency={
              radians.interpolate(interp(1))
            }
            numOctaves="1" type="fractalNoise" result="turbulence"
          />

          <feBlend in="turbulence" in2="blurcirc" mode="multiply" result="blended"/>

          <feDisplacementMap in="SourceGraphic" in2="blended"
            scale={strength} xChannelSelector="R" yChannelSelector="R"
            result="distored"
          />
          <feGaussianBlur stdDeviation=".5" />

*/
