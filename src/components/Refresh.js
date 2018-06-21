import '@/styles/Fn.scss';
import styles from '@/styles/Button.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import FABButton from 'react-mdl/lib/FABButton';
import Icon from 'react-mdl/lib/Icon';

const Refresh = props => (
  <div styleName="float-btn">
    <FABButton {...props} colored ripple>
      <Icon name="refresh" />
    </FABButton>
  </div>
);

Refresh.propTypes = {
  onClick: PropTypes.func
};

// eslint-disable-next-line babel/new-cap
export default CSSModules(Refresh, styles, { allowMultiple: true });
