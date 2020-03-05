import React, { useRef, useMemo } from 'react'
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

  const emitter = useMemo(() => {
    return new Emitter({
      onInterval: 1,
      interval: 2,
      ...emitterConfig
    })
  }, [emitterConfig])

  const config = useMemo(() => ({
    container: container,
    particles: {
        ttl: 7,
        gravity: 0,
        startColor: new Color('#000'),
        endColor: new Color('#fff'),
        ...particleConfig
    },
    system: {
        particlesCount: 4,
        emitters: emitter,
        speed: 7,
        ...systemConfig
    }
  }), [particleConfig, emitter, systemConfig]);

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
