import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { animated as a , useSpring } from 'react-spring/three';
import Heart from './Heart';


function HeartsRing({showText, ...props}) {

  const hearts = useMemo(() => {
    const numHearts = 10;
    const radius = 3;
    const step = (2*Math.PI) / numHearts;
    let angle = 0;
    const h = [];

    for (let i = 0; i < numHearts; i++) {
      h.push({
        x: radius * Math.cos(angle),
        z: radius * Math.sin(angle),
      })
      angle += step;
    }

    return h;
  }, []);

  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef || !groupRef.current) return;
    groupRef.current.rotation.y -= .007;
  })

  const [resetRotate, setResetRotate] = useState(false);
  const {rotateY} = useSpring({
    config: {
      duration: 3000
    },
    from: {
      rotateY: 0
    },
    to: {
      rotateY: 2*Math.PI
    },
    onRest: () => setResetRotate(state => !state),
    reset: resetRotate
  });

  return (
    <group
      dispose={null}
      ref={groupRef}
      position-y={-.2}
    >
      {hearts.map((h) => (
        <a.group
          key={h.x}
          rotation-y={rotateY.interpolate(y => -y)}
          position={[h.x, 0, h.z]}
          scale={[.15, .15, .15]}
        >
          <Heart />
        </a.group>
      ))}
    </group>
  )
}

export default HeartsRing;
