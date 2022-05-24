import { useRef } from 'react';

const FlipAnimator = (props) => {
  let snapshot = useRef({});

  const getSnapshotBeforeUpdate = () => {
    if (snapshot.current) {
      return snapshot.current.getBoundingClientRect();
    }

    return null;
  }

  useEffect((prevProps, prevState, snapshot) => {
    if (snapshot.current) {
      const first = snapshot;
      const last = snapshot.current.getBoundingClientRect();
      const deltaX = last.left - first.left;
      const deltaY = last.top - first.top;

      snapshot.animate([
        { transform: `translate(${-deltaX}px, ${-deltaY}px)` },
        { transform: 'translate(0, 0)' },
      ], {
        duration: 300,
        easing: 'ease-out',
      });
    }
  }
}
