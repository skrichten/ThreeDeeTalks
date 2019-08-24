/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { cover, size } from 'polished';

const makePercent = (part, whole, round = false) => {
  const percent = (part / whole) * 100;

  return round ? `${Math.round((percent * 10) / 10)}%` : `${percent}%`;
};

const makeMediaQueries = (pictures) => {
  if (!pictures) return;

  return pictures.map((picture) => {
    if (!picture.media || !picture.width || !picture.height) return '';

    return `
      @media${picture.media} {
        padding-bottom: ${makePercent(picture.height, picture.width)}
      }
    `;
  });
};

const Picture = ({ pictures, children }) => (
  pictures
    ?
      <picture>
        {pictures.map((pic, i) => (
          <source
            srcSet={pic.srcSet}
            media={pic.media}
            key={i} // eslint-disable-line react/no-array-index-key
          />
        ))}
        {children}
      </picture>
    :
      <Fragment>
        {children}
      </Fragment>
);

const RatioImg = ({
  src,
  srcSet,
  picture,
  width,
  height,
  styles,
  innerRef,
  as,
  ...rest
}) => (
  <Wrapper
    width={width}
    height={height}
    styles={styles}
    picture={picture}
    ref={innerRef}
    as={as}
  >
    <Picture pictures={picture}>
      <img
        src={src}
        srcSet={srcSet}
        {...rest}
      />
    </Picture>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;

  &::after,
  img {
    display: block;
  }

  ${props => props.width && props.height && css`
    &::after {
    content: "";
    width: 100%;
    padding-bottom: ${makePercent(props.height, props.width)};

      ${props.picture && css`
        ${makeMediaQueries(props.picture)}
      `}
    }

    img {
      ${size('100%')}
      ${cover()}
      object-fit: cover;
    }
  `}

  ${props => props.styles && css`
    ${props.styles}
  `}
`;

RatioImg.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  styles: PropTypes.string,
};

export default RatioImg;
