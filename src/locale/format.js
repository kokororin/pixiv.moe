import { injectIntl, intlShape } from 'react-intl';

const ChildComponent = ({ intl, id, values }) => intl.formatMessage({ id }, values);

ChildComponent.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(ChildComponent);
