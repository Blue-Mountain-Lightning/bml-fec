
const FeatureRow = ({name, valueA, valueB}) => {

  return (
    <tbody className='feature-row'>
      <tr>
        <td>{valueA}</td>
        <td>{name}</td>
        <td>{valueB}</td>
      </tr>
    </tbody>
  )
};

export default FeatureRow;
