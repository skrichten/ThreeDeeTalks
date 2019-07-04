
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

const vec2 center = vec2(0.5);
const float smoothness = 0.3;
const bool opening = true;
const float SQRT_2 = 1.414213562373;

varying vec2 vUv;

void main() {
  float x = opening ? u_progress : 1.-u_progress;
  float m = smoothstep(-smoothness, 0.0, SQRT_2*distance(center, vUv) - x*(1.+smoothness));
  vec4 color = texture2D(u_tex, vUv);
  gl_FragColor = vec4(color.rgb, opening ? 1.-m : m);
}
`;


export default {vertShader, fragShader };
