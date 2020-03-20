import React, { useMemo } from 'react';
import { TextureLoader } from 'three';

const getPlaneSize = (w, h) => {
  let ratio;
  let max = 12;
  if ( w > h ) {
    ratio = max / w;
    w = max;
    h = h * ratio;
  } else if ( h > w ) {
    ratio = max / h;
    h = max;
    w = w * ratio;
  } else {
    h = w = max;
  }
  return [w, h, 1];
};

function ImagePlane({ url, width, height, transparent,  ...props }) {

  const map = useMemo(() => new TextureLoader().load(url), [url]);

  return (
    <mesh { ...props } >
      <planeBufferGeometry attach="geometry" args={ getPlaneSize(width, height) } />
      <meshBasicMaterial attach="material"
        map={map}
        transparent={transparent}
      />
    </mesh>
  )

}

export default ImagePlane;
