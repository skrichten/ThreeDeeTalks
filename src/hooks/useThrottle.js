import { useRef, useEffect } from 'react';
//https://itnext.io/essential-react-hooks-design-patterns-a04309cc0404

function useThrottle( fun, timeout, changes = [] ){
  // Create the mutable local ref to store timer.
  const timer = useRef( null );

  function cancel(){
      if( timer.current ){
          clearTimeout( timer.current );
          timer.current = null;
      }
  }

  // Cancel the timer when the given values change or the component will unmount.
  useEffect( () => cancel, changes );

  // Return the throttled version of the function.
  return function( ...args ){
      cancel();

      // Save the timer to the ref, so it can be cancelled.
      timer.current = setTimeout(()=>{
          timer.current = null;
          fun.apply( this, args );
      }, timeout );
  }
}

export default useThrottle;
