import React from 'react';
import styled from 'styled-components';
import { Color, Vector3 } from 'three';
import { Randomizers } from 'skrichten.particles';
import Controls from '../components/OrbitControls';
import ThreeCanvas from '../components/ThreeCanvas';
import Particles from '../components/Particles';


const Stage = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: 1;
`;

const devicePixelRatio = window.devicePixelRatio.toFixed(2);

const ParticleEffects = () => {

  const onInit = ({ scene, gl }) => {
    scene.background = new Color(0x000000);
  };

  const pEmit = {
    onInterval: new Randomizers.MinMaxRandomizer(0, 5),
    interval: new Randomizers.MinMaxRandomizer(0, 0.25),
  }

  return (
    <main>
      <Stage>
        <ThreeCanvas
          pixelRatio={devicePixelRatio}
          onCreated={onInit}
        >
          <Controls position={[0, 0, 80]} />
          <group position={[0, 0, 0]}>
            <Particles
              particleConfig={{
                globalSize: 5,
                ttl: 12,
                velocity: new Randomizers.SphereRandomizer(12.5),
                velocityBonus: new Vector3(0, 25, 0),
                gravity: -10,
                startAlpha: 1,
                endAlpha: 0,
                startColor: new Randomizers.ColorsRandomizer(),

                startAlphaChangeAt: 0,
                blending: "additive",
                soft: false,
                roundShape: true,
                onUpdate: (particle) => {
                  const floorY = -10;
                  if (particle.position.y < floorY) {
                    particle.position.y = floorY;
                    particle.velocity.y *= -0.5;
                    particle.velocity.x *= 0.5;
                    particle.velocity.z *= 0.5;
                  }
                }
              }}
              systemConfig={{
                particlesCount: 1000,
                scale: 200,
                depthWrite: false,
                speed: 2.5
              }}
              emitterConfig={pEmit}
            />
          </group>
        </ThreeCanvas>
      </Stage>
    </main>
  )
};

export default ParticleEffects;

