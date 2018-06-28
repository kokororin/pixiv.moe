import styles from '@/styles/Message.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import MDSpinner from 'react-md-spinner';

const Loading = ({ isHidden }) => {
  return isHidden ? null : (
    <div styleName="message">
      <MDSpinner size={30} />
    </div>
  );
};

Loading.propTypes = {
  isHidden: PropTypes.bool
};

// eslint-disable-next-line babel/new-cap
export default CSSModules(Loading, styles);
