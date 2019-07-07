import { useState, useEffect, useCallback } from 'react';
import useTrottle from './useThrottle'

const useInfiniteScroll = (callback, triggerOffset = 1200) => {
  const [isFetchNeeded, setIsFetchNeeded] = useState(false);

  const handleScroll = useCallback(
    useTrottle(() => {
      console.log(window.innerHeight, window.pageYOffset || document.documentElement.scrollTop, document.documentElement.offsetHeight)
      const pos = window.innerHeight + document.documentElement.scrollTop + triggerOffset;
      if (pos < document.documentElement.offsetHeight || isFetchNeeded) return;
      console.log('needfetch');
      setIsFetchNeeded(true);
    }, 200)
  , [setIsFetchNeeded, isFetchNeeded, triggerOffset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetchNeeded) return;
    callback();
  }, [isFetchNeeded, callback]);

  return [isFetchNeeded, setIsFetchNeeded];
};

export default useInfiniteScroll;
