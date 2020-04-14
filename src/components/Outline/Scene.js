import React, { useRef, createRef, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useThree, useFrame, Dom } from "react-three-fiber";
import { animated as a } from 'react-spring/three';
import { useTransition, animated as da } from 'react-spring';
import Effects from './Effects';
import Fairy from './Fairy';
import useMouseSpring from '../../hooks/useMouseSpring';
import useScrollSpring from '../../hooks/useScrollSpring';
import Crumple from './Crumple';
import CanvasText from '../CanvasText';

const isGreater = (a, b) => a > b;
const isLess = (a, b) => a < b;

const Title = styled.h2`
  color: #000;
  font-size: 72px;
  margin: 0;
  position: relative;

  a {
    font-size: 18px;
    vertical-align: middle;
    text-decoration: none;
    position: absolute;
    top: 50%;
    left: 250px;
    white-space: nowrap;
  }
`;

const positions=[
  [-6, 1.4, 0],
  [0, -3, -7],
  [9, -1, -14],
  [-3.8, 2.1, -21]
]

const workData = [
  {
    id: 1,
    text: 'Audible / About',
    path: '/work/audible-about',
    imagePath: "/work-audible.jpg"
  },
  {
    id: 2,
    text: 'Invision',
    path: '/work/invision',
    imagePath: "/work-invision.jpg"
  },
  {
    id: 3,
    text: 'Audible / People Principles',
    path: '/work/audible',
    imagePath: "/work-audible-pp.jpg"
  },
  {
    id: 4,
    text: 'Waves',
    path: '/work/waves',
    imagePath: "/work-waves.jpg"
  },

]

export default function Scene({ ...props}) {
  const { viewport } = useThree();
  const fairyRef = useRef();
/*
    // Fairy position/rotation

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

  const itemRefs = useMemo(() => {
    return workData.map( () => createRef() )
  }, [workData]);

  const triggerTimes = useRef([]);

  useEffect(() => {
    workData.forEach( (w, i) => {
      const startTime = .01 + (i * .06);
      //itemRefs.current.push(craeteRef());
      triggerTimes.current.push({
        ref: itemRefs[i],
        time: startTime,
        action: 'fadeIn'
      })

      const playTrigger = {
        ref: itemRefs[i],
        time: startTime + .1,
        action: 'play',
        downLinkIndex: i,
        folded: true
      }

      if (i > 0) {
        playTrigger.upLinkIndex = i-1;
      }
      triggerTimes.current.push(playTrigger);
    })
  }, workData);


  const [currentIndex, setCurrentIndex] = useState(0);

  const transitions = useTransition(currentIndex, p => p, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const [[{scrollPos}], direction] = useScrollSpring({
    mass: 1, tension: 190, friction: 50, precision: .0001
  });

  const scrollDir = direction === 'down' ? 1 : -1;

  const scrollMove = scrollPos.interpolate(y => {

    const op = direction === 'down' ? isGreater : isLess;
    const newState =  direction === 'up';


    // Compare current scroll position with each trigger time
    // And call play() if applicable
    triggerTimes.current.forEach((t => {

      if ( t.ref.current && op(y, t.time) &&  t.folded !== newState ) {
        t.ref.current[t.action]();
        t.folded = newState;
        if (t.hasOwnProperty(direction + 'LinkIndex')) setCurrentIndex(t[direction + 'LinkIndex']);
      }
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
        {
          workData.map((workItem, i) => (
            <Crumple
              key={workItem.id}
              ref={itemRefs[i]}
              position={positions[i]}
              scale={[2, 2, 2]}
              imagePath={workItem.imagePath}
              animationPath={ i % 2 ? '/crumple3.glb' : '/crumple2.glb' }
              direction={scrollDir}
            />
          ))
        }
      </a.group>

      { false && <CanvasText>Work</CanvasText> }


    { false && <Effects /> }
    {
    <Dom center>
      <Title>Work

        {transitions.map(({ item, props, key }) => {
          const workItem = workData[item];
          return (
            <da.a key={key} style={props} href={workItem.path}>
              {workItem.text}
            </da.a>
          );
        })}
      </Title>

    </Dom>
    }
    </group>
  )

}
