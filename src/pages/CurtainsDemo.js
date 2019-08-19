import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Curtains } from "curtainsjs";
import CurtainShader from "../resources/shaders/CurtainShader";
import useEventListener from "../hooks/useEventListener";

const CanvasWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  left: 0;
  z-index: 1;
`;

const ImgWrap = styled.div`
  width: 50%;
  margin: 10vh auto;
  img { width: 100%; }
`;

const CurtainsDemo = () => {
  const curtains = useRef();

  const imgLoaded = useCallback(e => {
    curtains.current = new Curtains("curtains-canvas");
    const img1 = e.target.parentElement;

    const params = {
      vertexShader: CurtainShader.vertShader,
      fragmentShader: CurtainShader.fragShader,
      uniforms: {
        time: {
          name: "uTime", // uniform name that will be passed to our shaders
          type: "1f", // this means our uniform is a float
          value: 0
        }
      }
    };

    // create our plane
    const plane = curtains.current.addPlane(img1, params);



    if (plane) {
      plane.onRender(function() {
        // use the onRender method of our plane fired at each requestAnimationFrame call
        plane.uniforms.time.value++; // update our time uniform value
        plane.updatePosition();
      });
    }

    console.log(curtains.current);
  }, []);

  useEventListener('scroll', e => {

  })


  return (
    <section>
      <CanvasWrap id="curtains-canvas" />
      <ImgWrap>
        <img src="/photo1.jpg" alt="" onLoad={imgLoaded} />
      </ImgWrap>
    </section>
  );
};

export default CurtainsDemo;
