import React from 'react';
import { chooseLocale } from '@/locale';
import ReactDOMServer from 'react-dom/server';
import { injectIntl, intlShape, IntlProvider } from 'react-intl';

const ChildComponent = ({ intl, id, value }) => intl.formatMessage({ id }, value);

ChildComponent.propTypes = { intl: intlShape.isRequired };

const FormatMessage = injectIntl(ChildComponent);

const lang = chooseLocale(navigator.language);

// TODO: Centrilized language manager, a store system

export default (id, value) => ReactDOMServer.renderToStaticMarkup(<IntlProvider locale={lang.lang} messages={lang.message}><FormatMessage id={id} value={value} /></IntlProvider>);
