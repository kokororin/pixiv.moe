import React, { createContext } from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';
import * as api from '../utils/api';

const createStore = () => {
  const store = observable({
    authData: api.getAuth(),

    setAuth(data: any) {
      store.authData = data;
    }
  });
  return store;
};

type TAuthStore = ReturnType<typeof createStore>;

export const AuthContext = createContext<TAuthStore | null>(null);

export const AuthProvider: React.FC<{}> = props => {
  const store = useLocalStore(createStore);

  return (
    <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>
  );
};
