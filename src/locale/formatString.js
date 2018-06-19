import React from 'react';
import { IntlProvider } from 'react-intl';
import { chooseLocale, FormatMessage } from '@/locale';
import ReactDOMServer from 'react-dom/server';

const lang = chooseLocale(navigator.language);

// TODO: Centrilized language manager, a store system

export default (id, value) => ReactDOMServer.renderToStaticMarkup(<IntlProvider locale={lang.lang} messages={lang.message}><FormatMessage id={id} value={value} /></IntlProvider>);
