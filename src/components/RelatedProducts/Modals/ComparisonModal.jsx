import {useState, useEffect, useRef} from 'react';
import {MdCheck, MdClose} from 'react-icons/md';
import {GrFormClose} from 'react-icons/gr';

import './Modals.css';
import useOutsideClickListener from './useOutsideClickListener';
import FeatureRow from './FeatureRow';

const ComparisonModal = ({handleClose, a, b}) => {
  const wrapperRef = useRef(null);
  useOutsideClickListener(wrapperRef, handleClose);

  const longest =
    (a.features.length > b.features.length) ?
      a.features: b.features;

  const featuresData = longest.reduce((memo, feature, i) => {
    const aFeatures = a.features[i];
    const bFeatures = b.features[i];

    let aValue;
    if (aFeatures) {
      if (aFeatures.value === null) {
        aValue = <MdClose className='red-text' />;
      } else if (aFeatures.value === true) {
        aValue = <MdCheck className='green-text' />;
      } else {
        aValue = aFeatures.value;
      }
    }

    let bValue;
    if (bFeatures) {
      if (bFeatures.value === null) {
        bValue = <MdClose className='red-text' />;
      } else if (bFeatures.value === true) {
        bValue = <MdCheck className='green-text' />;
      } else {
        bValue = bFeatures.value;
      }
    }

    if (aFeatures && aFeatures.feature in memo) {
      memo[aFeatures.feature]['a'] = aValue;
    } else if (aFeatures) {
      memo[aFeatures.feature] = {'a': aValue};
    }

    if (bFeatures && bFeatures.feature in memo) {
      memo[bFeatures.feature]['b'] = bValue;
    } else if (bFeatures) {
      memo[bFeatures.feature] = {'b': bValue};
    }

    return memo;
  }, {});

  return (
    <div className='modal' ref={wrapperRef}>
      <div className='modal-header'>
        <div className='modal-title'>
          <span>Comparing</span>
        </div>
        <button onClick={handleClose}><GrFormClose title={'Close'} className='close-button'/></button>
      </div>
      <table>
        <thead>
          <tr>
            <th>{a.name}</th>
            <th className='middle-col'></th>
            <th className='right-col'>{b.name}</th>
          </tr>
        </thead>
        <tbody>
        {Object.keys(featuresData).map(feature =>
        <FeatureRow
          key={feature}
          valueA={featuresData[feature]['a']}
          valueB={featuresData[feature]['b']}
          name={feature}
        />
        )}
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonModal;
