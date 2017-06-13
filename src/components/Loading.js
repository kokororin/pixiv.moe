import styles from '@/styles/Message.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Spinner } from 'react-mdl';

@CSSModules(styles, { allowMultiple: true })
export default class Loading extends React.Component {
  static defaultProps = {
    isHidden: true
  };

  static propTypes = {
    isHidden: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    // it means ローディング
    return this.props.isHidden
      ? null
      : <div styleName={'message'}>
          <Spinner />
        </div>;
  }
}
