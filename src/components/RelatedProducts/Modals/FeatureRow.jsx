const FeatureRow = ({name, valueA, valueB}) => {

  return (
      <tr>
        <td className='left-col'>{valueA}</td>
        <td className='middle-col'><b>{name}</b></td>
        <td className='right-col right-col-content'>{valueB}</td>
      </tr>
  )
};

export default FeatureRow;
