const vertShader = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  // those are the mandatory attributes that the lib sets
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  // our texture matrix that will handle image cover
  uniform mat4 uTextureMatrix0;

  // pass your vertex and texture coords to the fragment shader
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  void main() {
      vec3 vertexPosition = aVertexPosition;

      gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

      // set the varyings
      // here we use our texture matrix to calculate the accurate texture coords
      vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
      vVertexPosition = vertexPosition;
  }
`;

const fragShader = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  // get our varyings
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform float uTime;
  uniform sampler2D uSampler0;

  uniform float uFreq;
  uniform float uSpeed;
  uniform float uAmp;
  uniform float uSeed;
  uniform float uX;
  uniform float uY;


  void main() {
    // get our texture coords from our varying
    vec2 textureCoord = vTextureCoord;
    float t = uTime * uSpeed;
    float a = textureCoord.y * uFreq * uX;
    float b = textureCoord.x * uFreq * uY;
    float x = (sin(a + t)) + (sin(a*uSeed*2.4 + t)) - (sin(a*uSeed*.7 + t + uSeed));
    float y = (sin(b + t)) - (sin(b*uSeed*2.4 + t)) + (sin(b*uSeed*.7 + t));
    x *= uAmp * uSeed * 1.2;
    y *= uAmp;
    textureCoord.x += x;
    textureCoord.y += y;
    vec4 color = texture2D(uSampler0, textureCoord);

    gl_FragColor = vec4(color);

  }
`;

export default {vertShader, fragShader};
