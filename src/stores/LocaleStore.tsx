import React from 'react';
import { observable } from 'mobx';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { IntlProvider, IntlConfig } from 'react-intl';
import chooseLocale from '@/locale/chooseLocale';

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

type TLocaleStore = ReturnType<typeof createStore>;

export const LocaleContext = React.createContext<TLocaleStore | null>(null);

export const LocaleProvider: React.FunctionComponent<{}> = props => {
  const store = useLocalStore(createStore);

  return (
    <LocaleContext.Provider value={store}>
      {props.children}
    </LocaleContext.Provider>
  );
};

export const ConnectedIntlProvider: React.FunctionComponent<IntlConfig> = props => {
  const locale = React.useContext(LocaleContext);

  if (!locale) {
    return null;
  }

  if (locale.messages && locale.lang) {
    return useObserver(() => (
      <IntlProvider messages={locale.messages} locale={locale.lang} {...props}>
        {props.children}
      </IntlProvider>
    ));
  }
  return <>{props.children}</>;
};
