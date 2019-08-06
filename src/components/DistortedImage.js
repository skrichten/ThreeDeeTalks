import React from 'react';
import styled from 'styled-components';
import { useSpring, animated as a } from 'react-spring';


const Distorted = styled.img`
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
            numOctaves="1" type="fractalNoise" result="turbulence"/>

          <feDisplacementMap in="SourceGraphic" in2="turbulence"
            scale={strength} xChannelSelector="R" yChannelSelector="R"
            result="distored"
          />
          <feGaussianBlur in="distored" stdDeviation=".5" />
        </filter>
      </defs>
    </svg>
    <Distorted src="https://picserio.com/data/out/8/dark-black-wallpaper_2334616.jpg" alt="" />
    </React.Fragment>
  )
}

export default DistortedImage;
