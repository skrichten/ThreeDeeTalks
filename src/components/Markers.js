import React, { useEffect, useState } from 'react';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


function loadModel (url) {
  return new Promise(resolve => {
    new GLTFLoader().load(url, resp =>  resolve(resp.scene));
  });
}

function Markers( props ) {
  const [markers, setMarkers] = useState(false);
  useEffect(() =>  void loadModel('./markers.glb').then(setMarkers), [setMarkers] );

  return (
    markers ? (
      <primitive object={markers} {...props} />
    )
    : <mesh />
  )
}

export default Markers;

