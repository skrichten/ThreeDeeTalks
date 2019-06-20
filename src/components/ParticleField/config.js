/**
 * The default configuation for the ParticleField component
 *
 * Any option passed in via props will overwrite the default config
 */
export default {
  showCube: false,
  dimension: '3D',
  velocity: .3,
  boundaryType: 'passthru',
  antialias: true,
  direction: {
    xMin: -1,
    xMax: 1,
    yMin: -1,
    yMax: 1,
    zMin: -1,
    zMax: 1
  },
  lines: {
    colorMode: 'rainbow',
    color: '#351CCB',
    transparency: 0.9,
    limitConnections: true,
    maxConnections: 20,
    minDistance: 150,
    visible: false
  },
  particles: {
    colorMode: 'solid',
    color: '#FFFFFF',
    transparency: 0.9,
    shape: 'circle',
    boundingBox: 'canvas',
    count: 200,
    minSize: 1,
    maxSize: 75,
    visible: true
  }
};
