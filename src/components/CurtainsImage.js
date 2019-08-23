import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import CurtainShader from '../resources/shaders/CurtainShader';
import {useCurtainsStore} from '../hooks/useCurtainsStore';
import useMouseSpringHandler from '../hooks/useMouseSpringHandler';
import { useSpring } from 'react-spring';

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

const ImgWrap = styled.div`
  width: 45%;
  margin: 50px auto;

  img {
    display: block;
    width: 100%;
    visibility: hidden;
  }
`;

const springConfig = {precision: .001, mass: 4, tension:50};

const CurtainsImage = ({ imgSrc }) => {
  const [wrapper, setWrapper] = useState(null);
  const { curtains } = useCurtainsStore();
  const wrapRef = useCallback(el => {
    setWrapper(el);
  }, [setWrapper]);

  const { spring, mouseMoveHandler } = useMouseSpringHandler(springConfig, true);
  const [{mouse}] = spring;

  const [{ freq, amp }, setDist] = useSpring(() => ({ freq: 20, amp:.005, config:springConfig }));

  useEffect(() => {
    if (!curtains || !wrapper) return;
    const params = {
      vertexShader: CurtainShader.vertShader,
      fragmentShader: CurtainShader.fragShader,
      uniforms: {
        time: {
          name: "uTime", // uniform name that will be passed to our shaders
          type: "1f", // this means our uniform is a float
          value: 0
        },
        frequency: {
          name: "uFreq", // uniform name that will be passed to our shaders
          type: "1f", // this means our uniform is a float
          value: freq.value
        },
        speed: {
          name: "uSpeed", // uniform name that will be passed to our shaders
          type: "1f", // this means our uniform is a float
          value: .2
        },
        amplutude: {
          name: "uAmp", // uniform name that will be passed to our shaders
          type: "1f", // this means our uniform is a float
          value: amp.value
        },
        seed: {
          name: "uSeed", // uniform name that will be passed to our shaders
          type: "1f", // this means our uniform is a float
          value: getRandomFloat(.3, .8)
        }
      }
    };

    // create our plane
    const plane = curtains.addPlane(wrapper, params);

    if (plane) {
      plane.onRender(function() {
        // use the onRender method of our plane fired at each requestAnimationFrame call
        //plane.uniforms.time.value++;
        plane.uniforms.time.value = performance.now() * 0.005;
        plane.uniforms.frequency.value = freq.value;
        plane.uniforms.amplutude.value = amp.value;
        // Try to wrap this in a condition so it only updates when position changes
        plane.updatePosition();
      });
    }

  }, [curtains, wrapper]);

  const onMouseOver = useCallback(() => {
    setDist({freq: 24, amp: .02})
  })

  const onMouseOut = useCallback(() => {
    setDist({freq: 20, amp: .005})
  })


  return (
    <section>
      <ImgWrap
        ref={wrapRef}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <img src={imgSrc} alt="" />
      </ImgWrap>
    </section>
  );
};

export default CurtainsImage;
