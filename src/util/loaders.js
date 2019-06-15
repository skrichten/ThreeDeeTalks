import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';


function loadTexture(url) {
  return load(TextureLoader, url);
}

function loadOBJ (url) {
  return load(OBJLoader, url);
}

function loadGLTF (url) {
  return load(GLTFLoader, url);
}

function load(loader, url) {
  return new Promise((resolve, reject) => {
    new loader().load(url,
      resp => resolve(resp),
      null,
      err => reject(err)
    );
  });
}

export {
  loadTexture,
  loadOBJ,
  loadGLTF
}
