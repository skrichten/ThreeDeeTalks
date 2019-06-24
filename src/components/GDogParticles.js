import React, { useRef } from 'react';
import { animated as a , useSpring } from 'react-spring/three';
import ParticleField from '../components/ParticleField/ParticleField';
import config from '../components/ParticleField/config';

// A set of particle configuration overrides for each lookIndex.
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

// Create a complete particle configuration for each lookIndex
var looks = configOverrides.map( c => {
  const particles = { ...config.particles, ...c }
  return { ...config, particles };
})

function GDogParticles({ lookIndex }) {

  // Move the particles slightly toward camera when transitioning between configurations/colors
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

  // Store the previous lookIndex and Slot that was used to display the particles in a Ref.
  // This setup will allow us to use just 2 ParticleFields (slots) to swap between all 4.
  const lastSetting = useRef(null);

  // The position of each ParticleField
  // For the one that is being transitioned in, we want the position to be the
  // animated value from the spring defined above.
  const positions = [ moveInSpring, {pos:[0, .1, 1]} ];

  // Define the config, opacity, and postion for both ParticleFields
  // depending on which should be getting transitioned in and which transitioned out.
  // Note that the ParticleField will animate Opacity on it's own when
  // it gets a new value for it's opacity prop
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
    positions[slot] = moveInSpring;
    positions[last.slot] = {pos:[0, .1, 1]}
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


  return (
    <>
    <a.group position={positions[0].pos} >
      <ParticleField {...particleProps[0]} />
    </a.group>
    <a.group position={positions[1].pos} >
      <ParticleField {...particleProps[1]} />
    </a.group>
    </>
  )

}

export default GDogParticles;
