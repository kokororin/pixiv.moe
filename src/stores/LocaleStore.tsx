import React, { useContext, createContext } from 'react';
import { observable } from 'mobx';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { IntlProvider, IntlConfig } from 'react-intl';
import chooseLocale from '../locale/chooseLocale';

const createStore = () => {
  const settedLocale = chooseLocale(navigator.language);

  const store = observable({
    lang: settedLocale.lang,
    messages: settedLocale.messages,

    setLocale(data: { lang: string; messages: any }) {
      store.lang = data.lang;
      store.messages = data.messages;
    }
  });
  return store;
};

type LocaleStore = ReturnType<typeof createStore>;

export const LocaleContext = createContext<LocaleStore>({} as LocaleStore);

export const LocaleProvider: React.FC<{}> = props => {
  const store = useLocalStore(createStore);

  return (
    <LocaleContext.Provider value={store}>
      {props.children}
    </LocaleContext.Provider>
  );
};

export const ConnectedIntlProvider: React.FC<IntlConfig> = props => {
  const locale = useContext(LocaleContext);

  return useObserver(() =>
    locale.messages && locale.lang ? (
      // @ts-ignore
      <IntlProvider messages={locale.messages} locale={locale.lang} {...props}>
        {props.children}
      </IntlProvider>
    ) : (
      <>{props.children}</>
    )
  );
};
