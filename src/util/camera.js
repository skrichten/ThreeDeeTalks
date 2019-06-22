const fitCameraToObject = function ( object, offset, orbitControls ) {

  const boundingBox = new THREE.Box3();
  boundingBox.setFromObject( object );

  const center = boundingBox.getCenter();
  const size = boundingBox.getSize();

  // get the max side of the bounding box
  const maxDim = Math.max( size.x, size.y, size.z );
  const fov = this.camera.fov * ( Math.PI / 180 );
  let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );

  // offset the camera as desired - usually a value of ~ 1.25 is good to prevent
  // object filling the whole canvas
  if( offset !== undefined && offset !== 0 ) cameraZ *= offset;

  camera.position.set( center.x, center.y, cameraZ );

  this.camera.updateProjectionMatrix();

  if ( orbitControls !== undefined ) {

    // set camera to rotate around center of loaded object
    orbitControls.target = center;

    // prevent camera from zooming out far enough to create far plane cutoff
    orbitControls.maxDistance = cameraToFarEdge * 2;

  }

};
