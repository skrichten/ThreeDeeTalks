import React, { useRef } from 'react';
import { useRender } from 'react-three-fiber';
import { animated as a , useSpring } from 'react-spring/three';
import ParticleField from '../components/ParticleField/ParticleField';
import config from '../components/ParticleField/config';

/*
function lerp(v0, v1, t) {
  return v0*(1-t)+v1*t
} */
//const order = [ 1, 2, 0, 3 ];
const configOverrides = [
  {
    colorMode: 'solid',
    color: '#5e5548'
  },
  {
    colorMode: 'solid',
    color: '#9b9d65'
  },
  {
    colorMode: 'rainbow',
    color: '#FFFFFF'
  },
  {
    colorMode: 'rainbow',
    color: '#FFFFFF'
  }
];

function GDogParticles({ lookIndex }) {

  config.particles = { ...config.particles, ...configOverrides[lookIndex]};

  const pGroup = useRef();
  const spring = useSpring({
    from: {pos: [0, 0, 0]},
    pos: [0, .1, 1],
    reset: true,
    config: {
      mass: 1,
      tension: 100,
      friction: 50,
      precision: .01
    }
  })

  useRender(() => {
    if (!pGroup || !pGroup.current) return;
    let r = pGroup.current.rotation;
    r.x += .0003;
    r.y -= .0002;
    r.z += .0003;
    //r.y = lerp(r.y, r.y + (Math.random() * .2), .007);
    //r.x = lerp(r.x, r.x + (Math.random() * .2), .007);
  })

  return (
    <a.group ref={pGroup} position={spring.pos}>
      <ParticleField config={config} opacity={lookIndex} />
    </a.group>
  )
}

export default GDogParticles;
