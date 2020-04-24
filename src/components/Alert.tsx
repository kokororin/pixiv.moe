import React from 'react';
import ReactDOM from 'react-dom';
import { Snackbar } from '@material-ui/core';
import MaterialAlert, { Color } from '@material-ui/lab/Alert';

interface IAlertProps {
  severity: Color;
  onDestroy: () => void;
}

const Alert: React.FunctionComponent<IAlertProps> = props => {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    return () => {
      props.onDestroy();
    };
  });

  const onClose = () => {
    setOpen(false);
    setTimeout(props.onDestroy, 500);
  };

  return (
    <Snackbar open={open} autoHideDuration={3500} onClose={onClose}>
      <MaterialAlert onClose={onClose} severity={props.severity}>
        {props.children}
      </MaterialAlert>
    </Snackbar>
  );
};

export const useAlert = () => (severity: Color, message: string) => {
  const wrapper = document.body.appendChild(document.createElement('div'));
  const onDestroy = () => {
    ReactDOM.unmountComponentAtNode(wrapper);
    return setTimeout(() => {
      wrapper.remove();
    });
  };
  ReactDOM.render(
    <Alert severity={severity} onDestroy={onDestroy}>
      {message}
    </Alert>,
    wrapper
  );
};

export default Alert;
