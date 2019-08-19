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

  // the uniform we declared inside our javascript
  uniform float uTime;

  // our texture sampler (default name, to use a different name please refer to the documentation)
  uniform sampler2D uSampler0;

  void main() {
    // get our texture coords from our varying
    vec2 textureCoord = vTextureCoord;

    // displace our pixels along the X axis based on our time uniform
    // textures coords are ranging from 0.0 to 1.0 on both axis
    textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(uTime / 50.0)) / 25.0;

    // map our texture with the texture matrix coords
    gl_FragColor = texture2D(uSampler0, textureCoord);
  }
`;

export default {vertShader, fragShader};
