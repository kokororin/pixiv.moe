import '@/styles/Fn.scss';
import '@/styles/Button.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { FABButton, Icon } from 'react-mdl';

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
      <div className={'float-btn refresh'}>
        <FABButton {...this.props} colored ripple>
          <Icon name={'refresh'} />
        </FABButton>
      </div>
    );
  }
}
