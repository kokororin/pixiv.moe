import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

export const styles = {
  message: {
    textAlign: 'center',
    padding: '20px 0',
    color: '#999',
    '& p': {
      fontSize: 15
    }
  }
};

@withStyles(styles)
export default class Message extends React.Component {
  static propTypes = {
    isHidden: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {
    isHidden: false
  };

  render() {
    const { classes } = this.props;

    return this.props.isHidden ? null : (
      <div className={classes.message}>
        <p>
          {this.props.text ? (
            this.props.text
          ) : (
            <FormattedMessage id="An error occurred. Check the URL or wait for a while and access again." />
          )}
        </p>
      </div>
    );
  }
}
