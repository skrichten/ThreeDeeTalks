import { useCallback, useState } from 'react';

function useElement() {
  const [el, setEl] = useState(null);

  const ref = useCallback(node => {
    if (node !== null) setEl(node);
  },[]);

  return [ref, el];
}

export default useElement;
