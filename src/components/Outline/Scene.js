import React from 'react';
import Effects from './Effects';
import Fairy from './Fairy';


export default function Scene({ ...props}) {


  return (
    <group  {...props}>
      <Fairy />
      <Effects />
    </group>
  )

}
