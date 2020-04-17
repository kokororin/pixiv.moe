import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';

export const useStyles = makeStyles({
  message: {
    textAlign: 'center',
    padding: '20px 0',
    color: '#999',
    '& p': {
      fontSize: 15
    }
  }
});

interface IMessageProps {
  isHidden?: boolean;
  text?: string;
}

const Message: React.FunctionComponent<IMessageProps> = ({
  isHidden,
  text
}) => {
  const classes = useStyles();
  const intl = useIntl();

  return isHidden ? null : (
    <div className={classes.message}>
      <p>
        {text
          ? text
          : intl.formatMessage({
              id:
                'An error occurred. Check the URL or wait for a while and access again.'
            })}
      </p>
    </div>
  );
};

export default Message;
