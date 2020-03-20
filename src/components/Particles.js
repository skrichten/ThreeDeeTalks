import React, { useRef, useEffect } from 'react'
import { Color } from 'three';
import { useFrame, extend } from 'react-three-fiber';
import {ParticlesSystem, Emitter} from 'mage-engine.particles';

extend({ ParticlesSystem });

const Particles = ({
  particleConfig,
  systemConfig,
  emitterConfig,
  ...props
}) => {
  const containerRef = useRef();
  const prtcls = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    const config = {
      container: containerRef.current,
      particles: {
          ttl: 7,
          gravity: 0,
          startColor: new Color('#000'),
          endColor: new Color('#000'),
          blending: 'blend',
          startAlpha: 1,
          endAlpha: 0,
          ...particleConfig
      },
      system: {
          particlesCount: 4,
          emitters: new Emitter({
            onInterval: 1,
            interval: 2,
            ...emitterConfig
          }),
          speed: 7,
          ...systemConfig
      }
    }

    prtcls.current = new ParticlesSystem(config);

    return () => {
      if (!prtcls.current) return;
      prtcls.current.removeSelf();
      prtcls.current.dispose();
    }

  }, [emitterConfig, particleConfig, systemConfig])

  useFrame(() => {
    prtcls.current && prtcls.current.update()
  });

  return (
    <group
      ref={containerRef}
      {...props}
    />
  );
}

export default Particles;
