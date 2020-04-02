import React, { useRef } from 'react';
import styled from 'styled-components';
import { useThree, useFrame, Dom } from "react-three-fiber";
import { animated as a } from 'react-spring/three';
import Effects from './Effects';
import Fairy from './Fairy';
import useMouseSpring from '../../hooks/useMouseSpring';
import useScrollSpring from '../../hooks/useScrollSpring';
import Crumple from './Crumple';

const isGreater = (a, b) => a > b;
const isLess = (a, b) => a < b;

const Title = styled.h2`
  color: #000;
  font-size: 72px;
  margin: 0;

  span {
    font-size: 18px;
    vertical-align: middle;
    margin-left: 70px;
  }
`;

export default function Scene({ ...props}) {
  const { viewport } = useThree();
  const fairyRef = useRef();
  const item1Ref = useRef();
  const item2Ref = useRef();
  const item3Ref = useRef();
  const item4Ref = useRef();


  // Fairy position/rotation
  /*
  const [{mouse}] = useMouseSpring({precision: .001, mass: 1, tension:120});
  const mouseRot = mouse.interpolate( (x) => ((x * 2) - 1) * 1.3 );
  const mousePos = mouse.interpolate( (x, y) => {
    const mappedX = (x * 2) - 1;
    return [
      ((mappedX * viewport.width) / 2) - (mappedX * 3),
      -((((y * 2) - 1) * viewport.height) / 2) - .8,
      0
    ]
  }); */

  const triggerTimes = useRef([
    {
      ref: item1Ref,
      time: .01,
      action: 'fadeIn'
    },
    {
      ref: item1Ref,
      time: .1,
      action: 'play'
    },
    {
      ref: item2Ref,
      time: .07,
      action: 'fadeIn'
    },
    {
      ref: item2Ref,
      time: .17,
      action: 'play'
    },
    {
      ref: item3Ref,
      time: .14,
      action: 'fadeIn'
    },
    {
      ref: item3Ref,
      time: .24,
      action: 'play'
    },
    {
      ref: item4Ref,
      time: .21,
      action: 'fadeIn'
    },
    {
      ref: item4Ref,
      time: .31,
      action: 'play'
    },
  ]);

  const [[{scrollPos}], direction] = useScrollSpring({
    mass: 1, tension: 190, friction: 50, precision: .0001
  });

  const scrollDir = direction === 'down' ? 1 : -1;

  const scrollMove = scrollPos.interpolate(y => {

    const op = direction === 'down' ? isGreater : isLess;

    // Compare current scroll position with each trigger time
    // And call play() if applicable
    triggerTimes.current.forEach((t => {
      if ( t.ref.current && op(y, t.time) ) t.ref.current[t.action]();
    }))

    return y * 100;
  });

  return (
    <group  {...props}>
      { /*
        <a.object3D rotation-y={mouseRot} position={mousePos}>
          <Fairy ref={fairyRef} />
        </a.object3D>
      */}
      <a.group position-z={scrollMove}>
        <Crumple
          name="Audible"
          ref={item1Ref}
          position={[-6, 1.2, 0]}
          scale={[2, 2, 2]}
          imagePath="/work-audible.jpg"
          animationPath="/crumple3.glb"
          direction={scrollDir}
        />
        <Crumple
          name="Invision"
          ref={item2Ref}
          position={[0, -3, -7]}
          scale={[2, 2, 2]}
          imagePath="/work-invision.jpg"
          animationPath="/crumple2.glb"
          direction={scrollDir}
        />
        <Crumple
          name="AudiblePP"
          ref={item3Ref}
          position={[6, -1, -14]}
          scale={[2, 2, 2]}
          imagePath="/work-audible-pp.jpg"
          animationPath="/crumple3.glb"
          direction={scrollDir}
        />
        <Crumple
          name="Waves"
          ref={item4Ref}
          position={[-3.8, 2.1, -21]}
          scale={[2, 2, 2]}
          imagePath="/work-waves.jpg"
          animationPath="/crumple2.glb"
          direction={scrollDir}
        />
      </a.group>


      <directionalLight
        args={[0xffffff]}
        intensity={.5}
        position={[3, 3, 4]}
        shadow-bias={0.0001}
        shadow-camera-right={5}
        shadow-camera-left={-1}
        shadow-camera-top={5}
        shadow-camera-bottom={-2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-radius={15}
        castShadow
    ></directionalLight>

    <ambientLight args={[0xffffff, .7]}/>

    { false && <Effects /> }
    <Dom center>
      <Title>Work
        <span>Audible / About</span>
      </Title>
    </Dom>
    </group>
  )

}
