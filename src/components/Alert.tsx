import React, { useState, useCallback, useContext, createContext } from 'react';
import { Snackbar } from '@mui/material';
import MaterialAlert, { AlertColor as Color } from '@mui/material/Alert';

type CreateAlert = (severity: Color, message: string) => void;

const AlertContext = createContext({} as CreateAlert);

export const AlertProvider: React.FC<{}> = props => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<Color>('info');
  const [message, setMessage] = useState('');

  const createAlert = useCallback((severity: Color, message: string) => {
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
  const createAlert = useContext(AlertContext);
  return createAlert;
};
