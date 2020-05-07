import React, { useRef, createRef, useState, useMemo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Dom } from "react-three-fiber";
import { animated as a } from 'react-spring/three';
import { useTransition, animated as da } from 'react-spring';
import useScrollSpring from '../../hooks/useScrollSpring';
import Crumple from './Crumple';

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
];

const fadeConfig={
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
}

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
];

export default function Scene({ topOffset, showDom, active, ...props }) {

  const itemRefs = useMemo(() => {
    return workData.map( () => createRef() )
  }, []);

  const triggerTimes = useRef([]);

  useEffect(() => {
    workData.forEach( (w, i) => {
      /* Calculate start "time" for each item
         "times" are compared with the scroll postition
         to trigger the actions (animations)
      */
      const startTime = .01 + (i * .06);
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
  }, [itemRefs]);


  const [currentIndex, setCurrentIndex] = useState(0);
  const [indexOverride, setIndexOverride] = useState(null);

  // Used to transition the whole dom section
  const mainTransition = useTransition(showDom, null, fadeConfig)

  // Used to transition titles in the center
  const itemTransitions = useTransition(indexOverride === null ? currentIndex : indexOverride, p => p, fadeConfig);

  const [[{scrollPos}], direction] = useScrollSpring({
    mass: 1, tension: 190, friction: 50, precision: .0001
  });

  const scrollDir = direction !== 'up' ? 1 : -1;

  const checkTriggerTimes = (y) => {
    // Adjust scroll position using the topOffset (height of the hero)
    if (y < topOffset || !active) return;
    let pos = Math.max(y - topOffset, 0);
    const op = direction !== 'up' ? isGreater : isLess;
    const newState =  direction === 'up';

    // Compare current scroll position with each trigger time
    // And call the current action (play, fadein) if applicable
    triggerTimes.current.forEach((t => {
      if ( t.ref.current && op(pos, t.time) &&  t.folded !== newState ) {
        t.ref.current[t.action](scrollDir);
        t.folded = newState;
        /* Set the current index so that the center text will update
           Direction is involved here because the timing needs to be altered based on direction
        */
        if (t.hasOwnProperty(direction + 'LinkIndex')) setCurrentIndex(t[direction + 'LinkIndex']);
      }
    }))

    return pos * 100;
  }

  const scrollMove = scrollPos.interpolate(checkTriggerTimes);

  /**
   * Normally the current work item index is determined based on scroll postition,
   * but if the user mouse's over an item we need to temporarily override that.
   */
  const onMouseOver = i => {
    setIndexOverride(i);
    document.body.style.cursor = 'pointer';
  }

  const onMouseOut = e => {
    setIndexOverride(null);
    document.body.style.cursor = 'default';
  }

  const itemRef = useCallback(node => {
    if (node !== null) {
      itemRefs[node.getIndex()].current = node;

      // tried to initialize state of each item here
      // unfortunately the items are not ready yet
      // animation actions are not available until next render :( )
      // const scrollY = getScrollPos();
      // checkTriggerTimes(scrollY);
    }
  }, [itemRefs]);

  return (
    <group  {...props}>
      <a.group position-z={scrollMove}>
        {
          workData.map((workItem, i) => (
            <Crumple
              key={workItem.id}
              index={i}
              ref={itemRef}
              position={positions[i]}
              scale={[2, 2, 2]}
              imagePath={workItem.imagePath}
              animationPath={ i % 2 ? '/crumple3.glb' : '/crumple2.glb' }
              onMouseOver={() => {onMouseOver(i)}}
              onMouseOut={onMouseOut}
            />
          ))
        }
      </a.group>
      <Dom center>
        {mainTransition.map(({ item, key, props }) =>
          item &&
          <da.div key={key} style={props}>
            <Title>Work
              {itemTransitions.map(({ item, props, key }) => {
                const workItem = workData[item];
                return (
                  <da.a key={key} style={props} href={workItem.path}>
                    {workItem.text}
                  </da.a>
                );
              })}
            </Title>
          </da.div>
        )}
      </Dom>
    </group>
  )

}
