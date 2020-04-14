import { useRef, useEffect, useState } from 'react';


const useScrollBounds = () => {
  const ref = useRef()
  const [scrollBounds, setScrollBounds] = useState([0,0]);

  useEffect(() => {
    if (!ref.current) return;

    const updateScrollBounds = () => {
      const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      const rect = ref.current.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop + rect.top;
      const top = scrollTop / scrollHeight;
      const bottom = (scrollTop + rect.height) / scrollHeight;
      setScrollBounds([top, bottom]);
    }

    global.addEventListener('resize', updateScrollBounds);
    updateScrollBounds();
    return () => global.removeEventListener('resize', updateScrollBounds);
  }, [setScrollBounds]);

  return [ref, scrollBounds]
}

export default useScrollBounds;
