import React, { useRef, useState } from 'react';
import { useThree, useFrame } from "react-three-fiber";
import { animated as a } from 'react-spring/three';


import useScrollPos from '../../hooks/useScrollPos';
import Crumple from '../Outline/Crumple';

const isGreater = (a, b) => a > b;
const isLess = (a, b) => a < b;

export default function Scene({ ...props}) {
  const [scrollDir, setScrollDir] = useState()
  const item1Ref = useRef();
  const item2Ref = useRef();

  const triggerTimes = useRef([
    {
      ref: item1Ref,
      time: .01,
      action: 'fadeIn'
    },
    {
      ref: item1Ref,
      time: .07,
      action: 'play'
    },
    {
      ref: item2Ref,
      time: .04,
      action: 'fadeIn'
    },
    {
      ref: item2Ref,
      time: .1,
      action: 'play'
    },
  ]);

  useScrollPos( (y, direction) => {

    const op = direction === 'down' ? isGreater : isLess;
    //scrollDir.current = direction === 'down' ? 1 : -1;
    setScrollDir(direction === 'down' ? 1 : -1);

    // Compare current scroll position with each trigger time
    // And call play() if applicable
    triggerTimes.current.forEach((t => {
      if ( t.ref.current && op(y, t.time) ) t.ref.current[t.action]();
    }))

  });

  return (
    <group  {...props}>
      <group>
        <Crumple
          ref={item1Ref}
          position={[0, .7, 20]}
          scale={[2, 2, 2]}
          imagePath="/seagullsLogo.png"
          animationPath="/crumple3.glb"
          direction={scrollDir}
          speed={1.5}
          shadeless={true}
        />
      </group>


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

    </group>
  )

}
