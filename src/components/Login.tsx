import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import { Button, TextField } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl';
import moment from '@/utils/moment';
import Storage from '@/utils/Storage';

const styles = createStyles({
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    zIndex: 1000
  },
  modalBody: {
    position: 'fixed',
    width: '24em',
    left: '50%',
    top: '50%',
    zIndex: 1001,
    background: '#fff',
    transform: 'translate(-50%, -50%)',
    boxShadow:
      'rgba(0, 0, 0, 0.24706) 0 14px 45px, rgba(0, 0, 0, 0.21961) 0 10px 18px',
    borderRadius: '2px',
    outline: '0 none',
    '@media screen and (max-width: 600px)': {
      width: '18em'
    }
  },
  clear: {
    float: 'right',
    cursor: 'pointer',
    padding: 5
  },
  avatar: {
    left: '50%',
    '& img': {
      borderRadius: '50%',
      verticalAlign: 'middle'
    }
  },
  avatarName: {
    paddingLeft: 10,
    fontSize: 16
  },
  form: {
    height: 'auto',
    opacity: 1,
    padding: '3em'
  },
  fields: {
    opacity: 1,
    visibility: 'visible'
  },
  footer: {
    paddingTop: '1em'
  }
});

interface ILoginProps extends WithStyles<typeof styles> {
  intl: InjectedIntl;
  onRef: (ref: OrignalLogin) => any;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  isSubmitting: boolean;
  authData: any;
}

interface ILoginState {
  isHidden: boolean;
  isClosing: boolean;
  username: string;
  password: string;
  authData?: any;
}

export class OrignalLogin extends React.Component<ILoginProps, ILoginState> {
  static defaultProps = {
    onRef() {}
  };

  constructor(props: ILoginProps) {
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

  open = () => {
    this.setState({
      isHidden: false
    });
  };

  close = () => {
    this.setState({
      isHidden: true
    });
  };

  setUsername = (username: string) => {
    this.setState({
      username
    });
  };

  getUsername = () => {
    return this.state.username;
  };

  setPassword = (password: string) => {
    this.setState({
      password
    });
  };

  getPassword = () => {
    return this.state.password;
  };

  renderContent() {
    const { classes } = this.props;

    if (
      this.props.authData !== null &&
      this.props.authData.expires_at > moment().unix()
    ) {
      return (
        <>
          <div className={classes.avatar}>
            <span className={classes.avatarName}>
              <FormattedMessage id="Nickname" /> 「
              {this.props.authData.user.name}」
            </span>
          </div>
          <div className={classes.footer}>
            <Button variant="contained" onClick={this.props.onLogoutClick}>
              <FormattedMessage id="Logout" />
            </Button>
          </div>
        </>
      );
    }
    return (
      <>
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
        <div className={classes.footer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.props.onLoginClick}
            disabled={this.props.isSubmitting}>
            <FormattedMessage
              id={this.props.isSubmitting ? 'Wait a Moment' : 'Login'}
            />
          </Button>
        </div>
      </>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Modal
        className={classes.modalBody}
        overlayClassName={classes.modalOverlay}
        isOpen={!this.state.isHidden}
        onRequestClose={this.close}
        contentLabel="login-modal">
        <div className={classes.clear} onClick={this.close}>
          <ClearIcon />
        </div>
        <div className={classes.form}>
          <div className={classes.fields}>{this.renderContent()}</div>
        </div>
      </Modal>
    );
  }
}

const Login = injectIntl(withStyles(styles)(OrignalLogin));

export default Login;
