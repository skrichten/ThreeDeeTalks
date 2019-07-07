import React, { useEffect, useState } from 'react';
import { animated as a } from 'react-spring/three';
import useScrollSpring from '../hooks/useScrollSpring';
import Frame from '../components/Frame';

const pKey = '12961327-bfee4abf99bc1fb24b7242055';
const apibase= `https://pixabay.com/api/?key=${pKey}&editors_choice=true&per_page=5&page=`;

function Blamo( { page }) {
  const [photos, setPhotos] = useState([]);
  // The useScrollSpring hook will provide the current normalized scroll position
  // as a react-spring AnimatedValue
  const [{scrollPos}] = useScrollSpring({}, false);

  // Setup an animated position from the useScrollSpring AnimatedValue
  // This will move the frames as the user scrolls.
  const scrollMove = scrollPos.interpolate(y => ( [0, 0, y * .002] ) );

  useEffect( () => {
    fetch(apibase + page, { mode: 'cors'})
      .then( resp => {
        return resp.json();
      })
      .then( data => {
        const hits = data.hits;
        setPhotos( state => ([ ...state, ...hits]) );

      })
      .catch( e => {
        console.log(e);
      });
   }, [page, setPhotos])

  return (
    <a.group position={scrollMove}>
      <a.group>
        {photos && photos.map( (p, i) =>
          <Frame key={p.id} position={[0,0,-i * 4]} imgSrc={p.largeImageURL} shaderIndex={i % 3} />
        )}
      </a.group>
    </a.group>
  );
}

export default Blamo;
