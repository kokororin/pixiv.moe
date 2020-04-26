import React from 'react';
import { Snackbar } from '@material-ui/core';
import MaterialAlert, { Color } from '@material-ui/lab/Alert';

type TCreateAlert = (severity: Color, message: string) => void;

const AlertContext = React.createContext({} as TCreateAlert);

export const AlertProvider: React.FunctionComponent<{}> = props => {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState<Color>('info');
  const [message, setMessage] = React.useState('');

  const createAlert = React.useCallback((severity: Color, message: string) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  }, []);

  return (
    <>
      <AlertContext.Provider value={createAlert}>
        {props.children}
      </AlertContext.Provider>
      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={() => setOpen(false)}>
        <MaterialAlert onClose={() => setOpen(false)} severity={severity}>
          {message}
        </MaterialAlert>
      </Snackbar>
    </>
  );
};

export const useAlert = () => {
  const createAlert = React.useContext(AlertContext);
  return createAlert;
};
