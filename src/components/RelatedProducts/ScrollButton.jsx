import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const ScrollButton = ({direction, active, onClick}) => {
  const style = active ? {} : {'opacity': '0.4', 'pointerEvents': 'none'};
  let IconComponent;
  let classes = 'card-button';

  if (direction === 'previous') {
    classes += ' card-prev';
    IconComponent = MdNavigateBefore;
  }

  if (direction === 'next') {
    classes += ' card-next';
    IconComponent = MdNavigateNext;
  }

  return (
    <button className={classes} onClick={onClick}>
      <IconComponent className='card-icon' style={style} />
    </button>
  )
}

export default ScrollButton;
