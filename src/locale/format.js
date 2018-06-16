import { injectIntl, intlShape } from 'react-intl';

const ChildComponent = ({ intl, id, values }) => {
  const message = intl.formatMessage({ id }, values);
  return message;
};

ChildComponent.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(ChildComponent);
