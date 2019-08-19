const vertShader = `
  void main() {
    gl_Position = vec4( position, 1.0 );
  }
`;

const fragShader = `
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform sampler2D u_tex;

  float freq = 37.0;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    float x = cos(uv.y*freq + u_time*4.0)/freq;
    uv.x += x;
    vec4 color = texture2D(u_tex, uv);
    vec3 ncol = vec3(asin(-x*20.0) + 0.8);

    gl_FragColor = vec4(ncol, color.a);
  }
`;

export default {vertShader, fragShader};
