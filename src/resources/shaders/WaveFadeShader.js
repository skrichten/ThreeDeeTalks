
const vertShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const fragShader = `
  uniform float u_progress;
  uniform sampler2D u_tex;

  varying vec2 vUv;

  vec2 offset(float progress, float x, float theta) {
    float phase = progress*progress + progress + theta;
    float shifty = 0.03*progress*cos(10.0*(progress+x));
    return vec2(0, shifty);
  }

  void main() {
    vec4 color = texture2D(u_tex, vUv + offset(1.0-u_progress, vUv.x, 3.14));
    gl_FragColor = vec4(color.rgb, u_progress);
  }
`;


export default {vertShader, fragShader };
