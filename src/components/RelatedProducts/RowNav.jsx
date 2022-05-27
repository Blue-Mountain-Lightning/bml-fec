import { MdCircle } from 'react-icons/md';

const RowNav = ({numProducts}) => {

  let dotArray = Array(numProducts).fill(0);

  return (
    <div className='row-dots'>
      {dotArray.map(dot => {
        return <MdCircle/>
      })}
    </div>
  )
}

export default RowNav;
