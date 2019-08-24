import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import CurtainShader from '../resources/shaders/CurtainShader';
import {useCurtainsStore} from '../hooks/useCurtainsStore';
import { useSpring } from 'react-spring';

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

const ImgWrap = styled.div`
  width: ${props => props.imgWidth};
  margin: 50px auto;

  img {
    display: block;
    width: 100%;
    max-width: 500px;
    opacity: ${props => props.domOpacity};
  }
`;

const springConfig = {precision: .001, mass: 4, tension:50};

const CurtainsImage = ({ imgSrc, imgWidth = '100%', domOpacity = 0 }) => {
  const [wrapper, setWrapper] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { curtains } = useCurtainsStore();
  const wrapRef = useCallback(el => {
    setWrapper(el);
  }, [setWrapper]);

  const [{ freq, amp }, setDist] = useSpring(() => ({ freq: 20, amp:.005, config:springConfig }));

  useEffect(() => {
    if (!curtains || !wrapper || !imgLoaded) return;
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

  }, [curtains, wrapper, imgLoaded, amp.value, freq.value]);

  const onMouseOver = () => {
    setDist({freq: 24, amp: .02})
  }

  const onMouseOut = () => {
    setDist({freq: 20, amp: .005})
  }

  const onImgLoaded = () => {
    setImgLoaded(true);
  }

  return (
      <ImgWrap
        imgWidth={imgWidth}
        domOpacity={domOpacity}
        ref={wrapRef}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <img
          src={imgSrc}
          alt=""
          onLoad={onImgLoaded}
        />
      </ImgWrap>
  );
};

export default CurtainsImage;
