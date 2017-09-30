import React from 'react';
import PropTypes from 'prop-types';

export default class GifPlayer extends React.Component {
  static propTypes = {
    images: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.play();
  }

  componentWillUnmount() {
    this.pause();
  }

  timer = null;
  isPlaying = false;
  index = -1;

  play() {
    if (!this.isPlaying) {
      this.timer = setInterval(() => {
        if (this.index < 0 || this.index + 1 >= this.props.images.length) {
          this.index = 0;
        } else {
          this.index++;
        }
        const ctx = this.canvasRef.getContext('2d');
        const img = document.createElement('img');
        img.onload = () => {
          this.canvasRef.width = img.width;
          this.canvasRef.height = img.height;
          ctx.drawImage(img, 0, 0);
        };
        img.src = this.props.images[this.index];
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
      <canvas ref={ref => (this.canvasRef = ref)} onClick={this.onImageClick} />
    );
  }
}
