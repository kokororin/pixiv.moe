import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';

const styles = createStyles({
  modalOverlay: {
    display: 'block'
  },
  container: {
    zIndex: 1005
  },
  close: {
    display: 'none'
  },
  open: {
    display: 'block',
    animation: 'alert-open 0.7s'
  },
  '@keyframes alert-open': {
    from: {
      opacity: 0,
      top: 0
    },
    to: {
      opacity: 1,
      top: '50%'
    }
  },
  wrapOuter: {
    boxSizing: 'border-box',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1004,
    opacity: 1
  },
  wrap: {
    color: 'rgba(0, 0, 0, 0.87059)',
    backgroundColor: 'rgb(255, 255, 255)',
    boxSizing: 'border-box',
    boxShadow:
      'rgba(0, 0, 0, 0.24706) 0 14px 45px, rgba(0, 0, 0, 0.21961) 0 10px 18px',
    borderRadius: 2
  },
  body: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    padding: 24,
    boxSizing: 'border-box',
    overflowY: 'hidden',
    maxHeight: 552
  }
});

interface IAlertProps extends WithStyles<typeof styles> {
  onRef: (ref: OriginalAlert) => any;
}

interface IAlertState {
  isHidden: boolean;
  content: string;
}

export class OriginalAlert extends React.Component<IAlertProps, IAlertState> {
  static defaultProps = {
    onRef() {}
  };

  constructor(props: IAlertProps) {
    super(props);

    this.state = {
      isHidden: true,
      content: ''
    };

    Modal.setAppElement('#app');
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  setContent = (content: string) => {
    if (!this.state.isHidden) {
      this.setState({
        isHidden: true
      });
    }

    this.setState({
      isHidden: false,
      content
    });

    setTimeout(() => {
      this.setState({
        isHidden: true
      });
    }, 3500);
  };

  render() {
    const { classes } = this.props;

    return (
      <Modal
        className={classes.container}
        overlayClassName={classes.modalOverlay}
        isOpen={!this.state.isHidden}
        contentLabel="alert-modal">
        <div className={classes.wrapOuter}>
          <div className={classes.wrap}>
            <div className={classes.body}>{this.state.content}</div>
          </div>
        </div>
      </Modal>
    );
  }
}

const Alert = withStyles(styles)(OriginalAlert);

export default Alert;
