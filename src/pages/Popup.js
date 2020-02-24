import React, { useRef, useEffect, useState, Suspense } from 'react';
import styled from 'styled-components';
import { FogExp2, Color, PCFSoftShadowMap } from 'three';
import { useFrame, useThree, extend, Dom } from 'react-three-fiber';
import ThreeCanvas from '../components/ThreeCanvas';
import BookGL from '../components/Popup/BookGL';


// This part just adds 3D navigation controls

const Camera = props => {
  const ref = useRef()
  const { setDefaultCamera } = useThree()
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), [])
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld())
  return <perspectiveCamera ref={ref} {...props} />
}
// End 3D navigation controls


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
    scene.background = new Color(0x5d57b2);
    scene.fog = new FogExp2(0xffffff, 0.05);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = PCFSoftShadowMap;
    gl.shadowMap.autoUpdate = true;
    gl.gammaInput = true;
    gl.gammaOutput = true;
  };

  const scrollLength = 4000;

  const popSecRef = useRef();
  const [scrollBounds, setScrollBounds] = useState([0,0]);

  useEffect(() => {
    if (!popSecRef.current) return;

    const updateScrollBounds = () => {
      const rect = popSecRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop + rect.top;
      console.log(document.documentElement.offsetHeight, rect.top, scrollTop);
      const top = scrollTop / document.documentElement.offsetHeight;
      const bottom = (scrollTop + rect.height) / document.documentElement.offsetHeight;
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
        <p>{scrollBounds[0]}   {scrollBounds[1]}</p>
      </HeroSection>

      <PopupSection ref={popSecRef}>

        <PopupCanvas
          pixelRatio={devicePixelRatio}
          onCreated={onInit}
        >
          <Camera position={[0, 1, 3 ]} rotation-x={-.1} />
          <Suspense fallback={<Dom center>loading...</Dom>}>
            <BookGL scrollBounds={scrollBounds} />
          </Suspense>

          <ambientLight args={[0xffffff, .5]}/>
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

