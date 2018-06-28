import '@/styles/Fn.scss';
import styles from '@/styles/Button.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';

const Refresh = props => (
  <div styleName="float-btn">
    <Button variant="fab" color="secondary" aria-label="add" {...props}>
      <RefreshIcon />
    </Button>
  </div>
);

Refresh.propTypes = {
  onClick: PropTypes.func
};

// eslint-disable-next-line babel/new-cap
export default CSSModules(Refresh, styles, { allowMultiple: true });
