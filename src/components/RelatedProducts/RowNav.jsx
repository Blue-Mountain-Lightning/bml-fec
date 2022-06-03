import { MdCircle } from 'react-icons/md';

const RowNav = ({numProducts, offset, maxOffset, cardWidth, numCards}) => {
  if (numProducts === 1) { return null };

  const dotArray = Array(numProducts).fill(0);

  const getCurrentIndex = (num = maxOffset, min = 0) => {
    if (num <= offset) {
      return {min, max: min + numCards - 1};
    } else {
      return getCurrentIndex(num - cardWidth, min + 1);
    }
  }

  const visibleIndices = getCurrentIndex();

  return (
    <div className='row-dots'>
      {dotArray.map((dot, i) => {
        let color = '#a9a9a9';
        let size = '6px';
        if (i >= visibleIndices.min && i <= visibleIndices.max) {
          color = '#36454F'
          size = '7px'
        }
        return <MdCircle size={size} key={i} color={color} />
      })}
    </div>
  )
}

export default RowNav;
