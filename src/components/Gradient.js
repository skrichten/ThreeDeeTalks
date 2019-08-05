import React from 'react';
import { useSpring, animated as a } from 'react-spring';

const config = {
  mass: 1, tension: 3, friction: 0, precision: 0.01,
};

function Gradient() {

  const { val } = useSpring({val:30, from:{val:70}, config});
  const stops = [];

  for (let x = 0; x < 11; x++) {
    stops.push(
      <a.stop
        offset={ val.interpolate( v=> `${(x * 10) + v}%` ) }
        stopColor={ x % 2 ? '#fff' : '#000' }
      />
    )
  }

  return (
    <React.Fragment>
    <svg xmlns="http://www.w3.org/2000/svg"  width="300" height="300">
      <defs>
        <linearGradient id="gradient" x1="100%" y1="200%">
          {stops}
        </linearGradient>
        <rect id="dmap" x="0%" y="0%" width="100%" height="100%" fill="url(#gradient)"></rect>
      </defs>
    </svg>

    </React.Fragment>
  )
}

export default Gradient;
