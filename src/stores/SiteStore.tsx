import React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';

const createStore = () => {
  const store = observable({
    contentClassName: 'unknown',

    get contentElement(): Element | null {
      return document.querySelector(`.${store.contentClassName}`);
    },

    setContentClassName(className: string) {
      store.contentClassName = className;
    }
  });
  return store;
};

type TSiteStore = ReturnType<typeof createStore>;

export const SiteContext = React.createContext<TSiteStore | null>(null);

export const SiteProvider: React.FunctionComponent<{}> = props => {
  const store = useLocalStore(createStore);

  return (
    <SiteContext.Provider value={store}>{props.children}</SiteContext.Provider>
  );
};
