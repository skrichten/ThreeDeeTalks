
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
const float threshold = 3.0;
const float fadeEdge = 0.7;

varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  float dist = distance(center, vUv) / threshold;
  float r = u_progress - min(rand(vec2(vUv.y, 0.0)), rand(vec2(0.0, vUv.x)));
  vec4 color = texture2D(u_tex, vUv);
  gl_FragColor = vec4(color.rgb, mix(0.0, mix(step(dist, r), 1.0, smoothstep(1.0-fadeEdge, 1.0, u_progress)), smoothstep(0.0, fadeEdge, u_progress)));
}
`;


export default {vertShader, fragShader };
