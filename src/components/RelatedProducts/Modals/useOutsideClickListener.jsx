import {useEffect} from 'react';

const useOutsideClickListener = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideClickListener;
