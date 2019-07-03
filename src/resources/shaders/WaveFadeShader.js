const uniforms = {
  u_time: { type: "f", value: 0.0 },
  u_opacity: { type: "f", value: 1.0 },
  u_tex: { type: "t", value: null }
}

const vertShader = `
  varying vec2 vUv;
  uniform mat3 uvTransform;

  void main() {
    vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const fragShader = `
  uniform float u_time;
  uniform sampler2D u_tex;
  uniform float opacity;

  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(u_tex, vUv);
    gl_FragColor = vec4(color);
  }
`;

export default {uniforms, vertShader, fragShader };
