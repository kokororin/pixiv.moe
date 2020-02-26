import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ICombinedState } from '@/reducers';

export default connect((state: ICombinedState) => ({
  locale: state.locale.lang,
  messages: state.locale.messages
}))(IntlProvider);
