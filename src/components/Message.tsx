import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  message: {
    textAlign: 'center',
    padding: '20px 0',
    color: '#999',
    '& p': {
      fontSize: 15
    }
  },
  errorContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column'
  },
  statusCode: {
    fontSize: 60,
    color: '#bcc6cc'
  },
  errorMessage: {
    fontSize: 20,
    color: '#464a4d',
    marginTop: 30,
    lineHeight: 1.5
  }
});

interface IMessageProps {
  code?: number;
  text: string;
}

const Message: React.FC<IMessageProps> = props => {
  const classes = useStyles();

  return props.code ? (
    <div className={classes.errorContainer}>
      <div className={classes.statusCode}>{props.code}</div>
      <div className={classes.errorMessage}>{props.text}</div>
    </div>
  ) : (
    <div className={classes.message}>
      <p>{props.text}</p>
    </div>
  );
};

export default Message;
