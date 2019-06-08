function loadTexture(url) {
  return new Promise(resolve => {
    return new THREE.TextureLoader().load( url, resp => resolve(resp));
  });
}

function loadGLTF (url) {
  return new Promise(resolve => {
    new GLTFLoader().load(url, resp =>  resolve(resp.scene));
  });
}

export default { loadTexture, loadGLTF };
