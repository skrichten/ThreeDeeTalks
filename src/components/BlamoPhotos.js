import React, { useEffect, useState } from 'react';
import { animated as a } from 'react-spring/three';
import useScrollSpring from '../hooks/useScrollSpring';
import Frame from '../components/Frame';

const pKey = '12961327-bfee4abf99bc1fb24b7242055';
const apibase= `https://pixabay.com/api/?key=${pKey}&editors_choice=true&per_page=10&page=`;

function Blamo( { nextPage }) {
  const [state, setState] = useState({ page: 1, photos:[] });
  // The useScrollSpring hook will provide the current scroll position
  // as a react-spring AnimatedValue
  const [{scrollPos}] = useScrollSpring({}, false);

  // Setup an animated position from the useScrollSpring AnimatedValue
  // This will move the frames as the user scrolls.
  const scrollMove = scrollPos.interpolate(y => ( [0, 0, y * .002] ) );

  useEffect( () => {
    fetch(apibase + nextPage, { mode: 'cors'})
      .then( resp => {
        return resp.json();
      })
      .then( data => {
        const hits = data.hits;
        setState( prevState => {
          const { photos } = prevState;
          const last = photos.length;
          hits.forEach( (h, i) => {
            h.idx = i + last;
          });
          return {page: nextPage, photos: [ ...photos, ...hits]};
        });

      })
      .catch( e => {
        console.log(e);
      });
   }, [nextPage, setState]);


    const getSlice = () => {
      const {page, photos} = state;
      const l = photos.length;
      let subset;
      if (l <= 10) {
        subset = photos;
      } else {
        const start = (page-2) * 5;
        subset = photos.slice(start, start + 15);
      }
      console.log(page, subset, photos);
      return subset;
    }

  return (
    <a.group position={scrollMove}>
      <a.group>
        {state.photos && state.photos.length > 4 && getSlice().map( p =>
          <Frame key={p.id} position={[0,0,-p.idx * 4]} imgSrc={p.largeImageURL} shaderIndex={p.idx % 3} />
        )}
      </a.group>
    </a.group>
  );
}

export default Blamo;
