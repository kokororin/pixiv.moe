import React from 'react';
import PropTypes from 'prop-types';

export default class GifPlayer extends React.Component {
  static propTypes = {
    images: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      index: -1
    };
  }

  componentDidMount() {
    this.play();
  }

  componentWillUnmount() {
    this.pause();
  }

  timer = null;
  isPlaying = false;

  play() {
    if (!this.isPlaying) {
      this.timer = setInterval(() => {
        let index = this.state.index;
        if (index < 0 || index + 1 >= this.props.images.length) {
          index = 0;
        } else {
          index++;
        }
        this.setState({ index });
      }, 80);
      this.isPlaying = true;
    }
  }

  pause() {
    if (this.isPlaying) {
      clearInterval(this.timer);
      this.isPlaying = false;
    }
  }

  @autobind
  onImageClick() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  render() {
    return (
      <img
        onClick={this.onImageClick}
        src={this.state.index < 0 ? '' : this.props.images[this.state.index]}
      />
    );
  }
}
