import React, { useRef, useEffect, useState, Suspense } from 'react';
import styled from 'styled-components';
import { FogExp2, Color, PCFSoftShadowMap, VSMShadowMap, LoopOnce } from 'three';
import { useFrame, useThree, Dom } from 'react-three-fiber';
import ThreeCanvas from '../components/ThreeCanvas';
import Scene from '../components/Popup/Scene';
import Lighting from '../components/Popup/Lighting';
import Camera from '../components/Camera';

const devicePixelRatio = window.devicePixelRatio.toFixed(1);

const HeroSection = styled.section`
  max-width: 800px;
  margin: 350px auto;
`;

const PopupSection = styled.section`
  position: relative;
`;

const PopupCanvas = styled(ThreeCanvas)`
  position: sticky;
  width: 100%;
`

const PopupBackground = styled.div`
  height: ${props => props.scrollLength}px;
  position: relative;
`;

const PopupFooter = styled.footer`
  max-width: 500px;
  margin: 500px auto;
`;

const PlayGround = () => {

  const onInit = ({ scene, gl }) => {
    scene.background = new Color(0x6c89d1);
    scene.fog = new FogExp2(0x6c89d1, 0.05);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = PCFSoftShadowMap;
    //gl.shadowMap.type = VSMShadowMap;
    gl.shadowMap.autoUpdate = true;
    gl.gammaInput = true;
    gl.gammaOutput = true;
  };

  const scrollLength = 7000;

  const popSecRef = useRef();
  const [scrollBounds, setScrollBounds] = useState([0,0]);

  useEffect(() => {
    if (!popSecRef.current) return;

    const updateScrollBounds = () => {
      const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      const rect = popSecRef.current.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop + rect.top;
      const top = scrollTop / scrollHeight;
      const bottom = (scrollTop + rect.height) / scrollHeight;
      setScrollBounds([top, bottom]);
    }

    global.addEventListener('resize', updateScrollBounds);
    updateScrollBounds();
    return () => global.removeEventListener('resize', updateScrollBounds);
  }, [setScrollBounds]);

  return (
    <main>
      <HeroSection>
        <h1>Hero Section Here</h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>{scrollBounds[0]}   {scrollBounds[1]} {LoopOnce}</p>
      </HeroSection>

      <PopupSection ref={popSecRef}>

        <PopupCanvas
          pixelRatio={devicePixelRatio}
          onCreated={onInit}
        >
          <Camera position={[0, 1, 0 ]} near={.01} fov={70} />
          <Suspense fallback={<Dom center>loading...</Dom>}>
            <Scene scrollBounds={scrollBounds} />
          </Suspense>
          <Lighting />
        </PopupCanvas>
        <PopupBackground scrollLength={scrollLength} />
      </PopupSection>
      <PopupFooter>
        <p>Some footer content down here.</p>
      </PopupFooter>
    </main>

  )
};

export default PlayGround;

