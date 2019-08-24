import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import RatioImg from './RatioImg';

const LazyImg = ({
  src,
  srcSet,
  picture,
  width,
  height,
  styles,
  bottomOffset,
  ...rest
}) => {
  const [imgRef, inView] = useInView({
    triggerOnce: true,
    rootMargin: bottomOffset || '250px',
  });

  return (
    <RatioImg
      width={width}
      height={height}
      styles={styles}
      src={inView ? src : undefined}
      srcSet={inView ? srcSet : undefined}
      picture={inView ? picture : undefined}
      innerRef={imgRef}
      {...rest}
    />
  );
};

LazyImg.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  bottomOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default LazyImg;
