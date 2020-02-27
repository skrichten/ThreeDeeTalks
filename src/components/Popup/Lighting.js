import React from 'react';
import { useResource } from 'react-three-fiber';

function Lighting({helper = false}) {
  const [lightRef, light] = useResource();

  return (
    <>
    <directionalLight
        ref={lightRef}
        args={[0xffffff]}
        intensity={.8}
        position={[3, 5, 2]}
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
    {light && helper && <cameraHelper args={[light.shadow.camera]} />}

    <ambientLight args={[0xffffff, .2]}/>
    </>
  )
}

export default Lighting;
