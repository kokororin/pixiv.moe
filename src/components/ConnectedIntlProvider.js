import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

export default connect(state => ({
  locale: state.locale.lang,
  messages: state.locale.messages
}))(IntlProvider);
