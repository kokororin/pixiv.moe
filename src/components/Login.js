import styles from '@/styles/Login.scss';
import '@/styles/Fn.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Modal from 'react-modal';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from '@/utils/moment';
import Storage from '@/utils/Storage';

@injectIntl
@CSSModules(styles, { allowMultiple: true })
export default class Login extends React.Component {
  static propTypes = {
    onRef: PropTypes.func,
    onLogoutClick: PropTypes.func,
    onLogoutClick: PropTypes.func,
    isSubmitting: PropTypes.bool,
    authData: PropTypes.object
  };

  static defaultProps = {
    onRef() {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      isClosing: false,
      username: '',
      password: ''
    };

    Modal.setAppElement('#app');
  }

  componentDidMount() {
    this.props.onRef(this);
    const authData = Storage.get('auth');
    this.setState({
      authData
    });
  }

  @autobind
  open() {
    this.setState({
      isHidden: false
    });
  }

  @autobind
  close() {
    this.setState({
      isHidden: true
    });
  }

  @autobind
  setUsername(username) {
    this.setState({
      username
    });
  }

  @autobind
  getUsername() {
    return this.state.username;
  }

  @autobind
  setPassword(password) {
    this.setState({
      password
    });
  }

  @autobind
  getPassword() {
    return this.state.password;
  }

  renderContent() {
    if (
      this.props.authData !== null &&
      this.props.authData.expires_at > moment().unix()
    ) {
      return (
        <React.Fragment>
          <div styleName="avatar">
            <span styleName="name">
              <FormattedMessage id="Nickname" /> 「{
                this.props.authData.user.name
              }」
            </span>
          </div>
          <div styleName="footer">
            <Button onClick={this.props.onLogoutClick} raised accent ripple>
              <FormattedMessage id="Logout" />
            </Button>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <TextField
          onChange={event => this.setUsername(event.target.value)}
          value={this.getUsername()}
          label={this.props.intl.formatMessage({
            id: 'Email Address / pixiv ID'
          })}
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          onChange={event => this.setPassword(event.target.value)}
          value={this.getPassword()}
          label={this.props.intl.formatMessage({
            id: 'Password'
          })}
          fullWidth
          margin="normal"
        />
        <div styleName="footer">
          <Button
            variant="contained"
            color="secondary"
            className={classNames({
              'fn-disallow': this.props.isSubmitting
            })}
            onClick={this.props.onLoginClick}
            disabled={this.props.isSubmitting}>
            <FormattedMessage
              id={this.props.isSubmitting ? 'Wait a Moment' : 'Login'}
            />
          </Button>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        styleName="login-modal-body"
        overlayClassName={styles['login-modal-overlay']}
        isOpen={!this.state.isHidden}
        onRequestClose={this.close}
        contentLabel="login-modal">
        <div styleName="clear" onClick={this.close}>
          <ClearIcon />
        </div>
        <div styleName="form">
          <div styleName="fields">{this.renderContent()}</div>
        </div>
      </Modal>
    );
  }
}
