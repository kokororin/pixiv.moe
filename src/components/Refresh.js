import '@/styles/Fn.scss';
import styles from '@/styles/Button.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import FABButton from 'react-mdl/lib/FABButton';
import Icon from 'react-mdl/lib/Icon';

@CSSModules(styles, { allowMultiple: true })
export default class Refresh extends React.Component {
  static propTypes = {
    onClick: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div styleName={'float-btn'}>
        <FABButton {...this.props} colored ripple>
          <Icon name={'refresh'} />
        </FABButton>
      </div>
    );
  }
}
