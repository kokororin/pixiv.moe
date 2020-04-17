import React from 'react';
import ReactDOM from 'react-dom';
import { Snackbar } from '@material-ui/core';
import Alert, { Color } from '@material-ui/lab/Alert';

interface IAlertModalProps {
  severity: Color;
  onDestroy: () => void;
}

const AlertModal: React.FunctionComponent<IAlertModalProps> = props => {
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
      <Alert onClose={onClose} severity={props.severity}>
        {props.children}
      </Alert>
    </Snackbar>
  );
};

export const make = (severity: Color, message: string) => {
  const wrapper = document.body.appendChild(document.createElement('div'));
  const onDestroy = () => {
    ReactDOM.unmountComponentAtNode(wrapper);
    return setTimeout(() => {
      wrapper.remove();
    });
  };
  ReactDOM.render(
    <AlertModal severity={severity} onDestroy={onDestroy}>
      {message}
    </AlertModal>,
    wrapper
  );
};

export default AlertModal;
