import React from 'react';
import ReactDOM from 'react-dom';
import { Snackbar } from '@material-ui/core';
import Alert, { Color } from '@material-ui/lab/Alert';

interface IAlertModalProps {
  severity: Color;
  onDestroy: () => void;
}

interface IAlertModalState {
  open: boolean;
}

export default class AlertModal extends React.Component<
  IAlertModalProps,
  IAlertModalState
> {
  node: HTMLDivElement;

  static make(severity: Color, message: string) {
    const wrapper = document.body.appendChild(document.createElement('div'));
    const onDestroy = () => {
      ReactDOM.unmountComponentAtNode(wrapper);
      return setTimeout(() => {
        wrapper.remove();
      });
    };
    ReactDOM.render(
      <AlertModal severity={severity} onDestroy={onDestroy}>
        {message}
      </AlertModal>,
      wrapper
    );
  }

  constructor(props: IAlertModalProps) {
    super(props);

    this.state = {
      open: true
    };
  }

  componentWillUnmount() {
    this.props.onDestroy();
  }

  onClose = () => {
    this.setState({
      open: false
    });
    setTimeout(this.props.onDestroy, 500);
  };

  render() {
    return (
      <Snackbar
        open={this.state.open}
        autoHideDuration={3500}
        onClose={this.onClose}>
        <Alert onClose={this.onClose} severity={this.props.severity}>
          {this.props.children}
        </Alert>
      </Snackbar>
    );
  }
}
