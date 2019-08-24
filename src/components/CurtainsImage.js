import React, { useEffect, useState } from 'react';
import { useSpring } from 'react-spring';
import CurtainShader from '../resources/shaders/CurtainShader';
import {useCurtainsStore} from '../hooks/useCurtainsStore';
import LazyImg from '../components/LazyImg';

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

const springConfig = {precision: .001, mass: 4, tension:50};

const CurtainsImage = ({
  imgSrc,
  imgWidth = 1,
  imgHeight = 1,
  domOpacity = 0,
  initialFreq = 20,
  initialAmp = .005

}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { curtains } = useCurtainsStore();

  const [{ freq, amp }, setDist] = useSpring(() => ({
    freq: initialFreq,
    amp:initialAmp,
    config:springConfig
  }));

  useEffect(() => {
    if (!curtains ||  !imgLoaded) return;
    const params = {
      vertexShader: CurtainShader.vertShader,
      fragmentShader: CurtainShader.fragShader,
      uniforms: {
        time: {
          name: "uTime",
          type: "1f",
          value: 0
        },
        frequency: {
          name: "uFreq",
          type: "1f",
          value: freq.value
        },
        speed: {
          name: "uSpeed",
          type: "1f",
          value: .2
        },
        amplutude: {
          name: "uAmp",
          type: "1f",
          value: amp.value
        },
        seed: {
          name: "uSeed",
          type: "1f",
          value: getRandomFloat(.2, .8)
        }
      }
    };

    // create our plane
    const plane = curtains.addPlane(imgLoaded.parentElement, params);

    if (plane) {
      plane.onRender(function() {
        plane.uniforms.time.value = performance.now() * 0.005;
        plane.uniforms.frequency.value = freq.value;
        plane.uniforms.amplutude.value = amp.value;
        // Try to wrap this in a condition so it only updates when position changes
        plane.updatePosition();
      });
    }

  }, [curtains, imgLoaded, amp.value, freq.value]);

  const onMouseOver = () => {
    setDist({freq: 24, amp: .02})
  }

  const onMouseOut = () => {
    setDist({freq: initialFreq, amp: initialAmp})
  }

  const onImgLoaded = e => {
    setImgLoaded(e.target);
  }

  return (
      <LazyImg
        width={imgWidth}
        height={imgHeight}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        src={imgSrc}
        onLoad={onImgLoaded}
        styles={ `opacity:${domOpacity}` }
      />
  );
};

export default CurtainsImage;
