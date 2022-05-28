import {useState, useEffect, useRef} from 'react';

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
    const aName = a.name;
    const bName = b.name;
    const aFeatures = a.features[i];
    const bFeatures = b.features[i];

    if (aFeatures && (!(aFeatures in memo))) {
      memo[aFeatures.feature] = {
        'a': a.features?.value,
        'b': bFeatures?.value
      };
    }
    if (bFeatures && (!(bFeatures in memo))) {
      memo[bFeatures.feature] = {
        'a': aFeatures?.value,
        'b': bFeatures?.value
      };
    }

    return memo;
  }, {});

  console.log(featuresData);

  return (
    <div className='modal' ref={wrapperRef}>
      <div className='modal-header'>
        <div className='modal-title'>
          <h3>Comparison</h3>
        </div>
        <div className='close-button'></div>
      </div>
      <table>
        <thead>
          <tr style={{'textAlign': 'left'}}>
            <th>{a.name}</th>
            <th></th>
            <th>{b.name}</th>
          </tr>
        </thead>
        {Object.keys(featuresData).map(feature =>
        <FeatureRow
          valueA={featuresData[feature].a}
          valueB={featuresData[feature].b}
          name={feature}
        />
        )}
      </table>
    </div>
  )
}

export default ComparisonModal;
