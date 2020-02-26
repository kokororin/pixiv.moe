import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

export const styles = createStyles({
  message: {
    textAlign: 'center',
    padding: '20px 0',
    color: '#999',
    '& p': {
      fontSize: 15
    }
  }
});

interface IMessageProps extends WithStyles<typeof styles> {
  isHidden?: boolean;
  text?: string;
}

const Message = withStyles(styles)(
  ({ isHidden, text, classes }: IMessageProps) =>
    isHidden ? null : (
      <div className={classes.message}>
        <p>
          {text ? (
            text
          ) : (
            <FormattedMessage id="An error occurred. Check the URL or wait for a while and access again." />
          )}
        </p>
      </div>
    )
);

export default Message;
