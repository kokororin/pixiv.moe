import { injectIntl, intlShape } from 'react-intl';

const ChildComponent = ({ intl, id, value }) => intl.formatMessage({ id }, value);

ChildComponent.propTypes = { intl: intlShape.isRequired };

export default injectIntl(ChildComponent);
