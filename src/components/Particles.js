import React, { useRef } from 'react'
import { Vector3, Color } from 'three';
import { useFrame, extend } from 'react-three-fiber';
import {ParticlesSystem, Randomizers, Emitter} from 'mage-engine.particles';

extend({ ParticlesSystem });

const Particles = ({
  container,
  particleConfig,
  systemConfig,
  emitterConfig,
  ...props
}) => {
  const prtcls = useRef();
  const config = {
    container: container,
    particles: {
        globalSize: .05,
        ttl: .3,
        velocity: new Randomizers.SphereRandomizer(.8, .4),
        gravity: 0,
        startColor: new Color('#fff'),
        endColor: new Color('#000'),
        ...particleConfig
    },
    system: {
        particlesCount: 50,
        emitters: new Emitter({
            onInterval: new Randomizers.MinMaxRandomizer(0, 5),
            interval: new Randomizers.MinMaxRandomizer(0, 0.25),
            ...emitterConfig
        }),
        speed: 2,
        ...systemConfig
    }
  }
  useFrame(() => prtcls.current && prtcls.current.update());
  return (
    <particlesSystem
      ref={prtcls}
      args={[config]}
      {...props}
    />
  );
}

export default Particles;
