import React, { useRef } from 'react';
import { animated as a , useSpring } from 'react-spring/three';
import ParticleField from '../components/ParticleField/ParticleField';
import config from '../components/ParticleField/config';

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

var looks = configOverrides.map( c => {
  const particles = { ...config.particles, ...c }
  return { ...config, particles };
})

function GDogParticles({ lookIndex }) {

  // Move slightly toward camera when transitioning
  const moveInSpring = useSpring({
    from: {pos: [0, 0, 0]},
    pos: [0, .1, 1],
    reset: true,
    config: {
      mass: 1,
      tension: 150,
      friction: 30,
      precision: .01
    }
  });

  const lastSetting = useRef(null);
  const springs = [ moveInSpring, {pos:[0, .1, 1]} ];

  const particleProps = [];
  const last = lastSetting.current
  if (last) {
    const slot = Number(!last.slot);
    particleProps[slot] = {
      config: looks[lookIndex],
      opacity: 1
    };
    particleProps[last.slot] = {
      config: looks[last.index],
      opacity: 0
    }
    lastSetting.current = {
      index: lookIndex, slot: slot
    }
    springs[slot] = moveInSpring;
    springs[last.slot] = {pos:[0, .1, 1]}
  } else {
    particleProps[0] = {
      config: looks[lookIndex],
      opacity: 1
    }
    particleProps[1] = {
      config: looks[lookIndex],
      opacity: 0
    }
    lastSetting.current = {
      index: lookIndex, slot: 0
    }
  }

  const pGroup0 = useRef();
  const pGroup1 = useRef();
  // A little rotation so particles don't just move in a stright line.
  /*
  useRender(() => {
    if (!pGroup0 || !pGroup0.current) return;
    let r = pGroup0.current.rotation;
    r.x += .0003;
    r.y -= .0002;
    r.z += .0003;
  }); */


  return (
    <>
    <a.group ref={pGroup0} position={springs[0].pos} >
      <ParticleField {...particleProps[0]} />
    </a.group>
    <a.group ref={pGroup1} position={springs[1].pos} >
      <ParticleField {...particleProps[1]} />
    </a.group>
    </>
  )

}

export default GDogParticles;
