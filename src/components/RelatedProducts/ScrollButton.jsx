import { MdNavigateBefore, MdNavigateNext} from 'react-icons/md';

const ScrollButton = ({direction, active}) => {
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

  let style = active ? {} : {'opacity': '0.4'};

  return (
    <button className={classes}>
      <IconComponent className='card-icon' style={style} />
    </button>
  )
}

export default ScrollButton;
