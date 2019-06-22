import React, { useRef } from 'react';
import { useRender } from 'react-three-fiber';
import ParticleField from '../components/ParticleField/ParticleField';
import config from '../components/ParticleField/config';

/*
function lerp(v0, v1, t) {
  return v0*(1-t)+v1*t
} */

function GDogParticles({ lookIndex }) {
  const pGroup = useRef();

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
    <group ref={pGroup}>
      <ParticleField config={config} />
    </group>
  )
}

export default GDogParticles;
