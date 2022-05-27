import { MdNavigateBefore, MdNavigateNext} from 'react-icons/md';

const ScrollButton = ({direction, isActive}) => {
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

  if (!isActive) {
    classes += ' hidden-button';
  }

  return (
    <button className={classes}>
      <IconComponent className='card-icon' />
    </button>
  )
}

export default ScrollButton;
