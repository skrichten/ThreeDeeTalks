import { useRef, useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

//https://github.com/drcmda/react-three-fiber/blob/master/src/canvas.tsx
function useMeasure() {
  const ref = useRef()

  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)));

  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref, ro])

  return [ ref , bounds];
}

export default useMeasure;
