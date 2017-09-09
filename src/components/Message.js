import styles from '@/styles/Message.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

const Message = ({ isHidden, text }) => {
  return isHidden ? null : (
    <div styleName="message">
      <p>{text}</p>
    </div>
  );
};

Message.defaultProps = {
  isHidden: false,
  text: 'エラーが発生しました。URLを確認するか、しばらく時間を置いて再度アクセスしてください。'
};

Message.propTypes = {
  isHidden: PropTypes.bool,
  text: PropTypes.string
};

export default CSSModules(Message, styles, { allowMultiple: true });
