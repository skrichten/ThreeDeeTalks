export const bp = {
  desktop: '1680px',
  desktopSm: '1440px',
  laptop: '1380px',
  laptopSm: '1240px',
  tablet: '1080px',
  portrait: '880px',
  mobile: '767px',
  mobileMid: '625px',
  mobileSm: '580px',
  mobileRealSm: '375px',
};

/**
 * Center the element with absolute positioning
 * Pass null to disable centering on a given axis
 * @param {number} offsetX The percentage to offset on the X axis
 * @param {number} offsetY The percentage to offset on the Y axis
 */
export const absoCenter = (offsetX = 0, offsetY = 0) => {
  let p = '';
  let trans = '';

  if (offsetX !== null) {
    p = `left: ${50 + offsetX}%;`;
    trans = 'translateX(-50%)';
  }

  if (offsetY !== null) {
    p = ` ${p} top: ${50 + offsetY}%;`;
    trans = `${trans} translateY(-50%)`;
  }

  return `
    position: absolute;
    ${p}
    transform: ${trans};
  `;
};
