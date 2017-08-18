import styles from '@/styles/Message.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Spinner from 'react-mdl/lib/Spinner';

const Loading = ({ isHidden }) => {
  // it means ローディング
  return isHidden
    ? null
    : <div styleName={'message'}>
        <Spinner />
      </div>;
};

Loading.propTypes = {
  isHidden: PropTypes.bool
};

export default CSSModules(Loading, styles, { allowMultiple: true });
