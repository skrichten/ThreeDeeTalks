import React from 'react';
import Tree from "./Tree";

function TreeLayout({ count = 12, ...props }) {

  return (
    <group {...props}>
      {
        new Array(count).fill(0).map( (x,i) => (
          <Tree
            key={i}
            position={[i*2.5, 0, (Math.sin(i*4)) *4 ]}
            scale-y={Math.random() * (1.4 - .7) + .7}
          />
        ))
      }
    </group>
  )
}

export default TreeLayout;



