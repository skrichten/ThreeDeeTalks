import React, { useState, useRef } from 'react';
import {
  TextureLoader,
  BoxBufferGeometry,
  Mesh,
  Vector3,
  Color,
  MultiplyBlending,
  CustomBlending,
  DstColorFactor,
  SrcColorFactor,
  MinEquation,
} from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { Randomizers } from 'skrichten.particles';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Particles from '../Particles';

const minVec = new Vector3(-.07, 0, 0);
const maxVec = new Vector3(.07, 0, 0);

function Content({showText, ...props}) {

  const [box] = useState(() => new Mesh(new BoxBufferGeometry(2.5, 2.5, 2.5)));
  const [rnd] = useState(() => new Randomizers.MinMaxRandomizer(.3, 1.3));
  const tTex = useLoader(TextureLoader, './team.png');
  const eTex = useLoader(TextureLoader, './team-eye.png');
  const aTex = useLoader(TextureLoader, './team-arrow.png');
  const boxOutline = useRef();
  const greenShape = useRef();
  const arrows = useRef();

  const { nodes } = useLoader(GLTFLoader, './greenTeamShape.glb')

  useFrame(() => {
    boxOutline.current.rotation.y += 0.0075;
    greenShape.current.rotation.y += 0.006;
    greenShape.current.rotation.x += 0.01;
    arrows.current.rotation.x += 0.05;
  })

  return (
    <group dispose={null} {...props}>

      <mesh // drawing
        scale={[1.3, 1.3, 1]}
        position={[0, 0, 0]}
      >
        <planeBufferGeometry
          attach="geometry"
          args={[5, 5, 1, 1]}
        />
        <meshBasicMaterial
          attach="material"
          map={tTex}
          color="#fff"
          transparent
        />
      </mesh>

      <group ref={arrows} position={[-.7, .85, 0]}>
        <sprite // down arrow
          position={[0, 0, .05]}
          scale={[.2, .2, 1]}
        >
          <spriteMaterial
            attach="material"
            map={aTex}
            blending={MultiplyBlending}
            depthTest={false}
          />
        </sprite>
        <sprite // up arrow
          position={[.05, 0, -.05]}
          scale={[.2, .2, 1]}
        >
          <spriteMaterial
            attach="material"
            map={aTex}
            blending={MultiplyBlending}
            depthTest={false}
            rotation={-Math.PI}
          />
        </sprite>
      </group>

      <mesh // eye
        scale={[.082, .082, 1]}
        position={[-.1, 1.9, .48]}
      >
        <planeBufferGeometry
          attach="geometry"
          args={[5, 5, 1, 1]}
        />
        <meshBasicMaterial
          attach="material"
          map={eTex}
          transparent
        />
      </mesh>
      <group ref={boxOutline} position-y={0}>
        <boxHelper args={[box, 0x000000]}  />
      </group>

      <mesh  // Green Shape
        scale={[.3, .3, .3]}
        position={[-.8, .2, .1]}
        geometry={nodes.Cube.geometry}
        ref={greenShape}
      >
        <meshBasicMaterial
          attach="material"
          color="#e2e445"
          blending={CustomBlending}
          blendEquation={MinEquation}
          blendSrc={DstColorFactor}
          blendDst={SrcColorFactor}
          depthTest={true}
          depthWrite={false}
        />
      </mesh>

      <Particles
        position={[-.26, 1.24, .01]}
        particleConfig={{
          startSize: .05,
          endSize: .05,
          startAlpha: 0,
          endAlpha: 1,
          roundShape: true,
          velocity: new Vector3(-.001, .05, .04),
          ttl: 12,
        }}
        systemConfig={{
          particlesCount: 50,
          speed: 7
        }}
        emitterConfig={{
          onInterval: 1,
          interval: rnd,
        }}
      />
      <Particles
        position={[-.18, 1.24, .01]}
        particleConfig={{
          startSize: .05,
          endSize: .05,
          startAlpha: 0,
          endAlpha: 1,
          roundShape: true,
          velocity: new Vector3(.02, .05, .04),
          ttl: 12,
        }}
        systemConfig={{
          particlesCount: 50,
          speed: 7
        }}
        emitterConfig={{
          onInterval: 1,
          interval: rnd,
        }}
      />
    </group>
  )
}

export default Content;
