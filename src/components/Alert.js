import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';

const styles = {
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
};

@withStyles(styles)
export default class Alert extends React.Component {
  static propTypes = {
    onRef: PropTypes.func
  };

  static defaultProps = {
    onRef() {}
  };

  constructor(props) {
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

  @autobind
  setContent(content) {
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
  }

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
