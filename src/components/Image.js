import React from 'react';
import Lightbox from 'react-image-lightbox';


class ImageComponent extends React.Component {

  static propTypes = {
    item: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      isOpen: false
    };
  }

  openLightbox(index) {
    this.setState({
      isOpen: true,
      index: index
    });
  }

  closeLightbox() {
    this.setState({
      isOpen: false
    });
  }

  moveNext() {
    this.setState({
      index: (this.state.index + 1) % this.props.images.length
    });
  }

  movePrev() {
    this.setState({
      index: (this.state.index + this.props.images.length - 1) % this.props.images.length
    });
  }

  render() {
    if (this.state.isOpen) {
      return (
        <Lightbox
                  mainSrc={ this.props.images[this.state.index].uri }
                  nextSrc={ this.props.images[(this.state.index + 1) % this.props.images.length].uri }
                  prevSrc={ this.props.images[(this.state.index + this.props.images.length - 1) % this.props.images.length].uri }
                  imageTitle={ this.props.images[this.state.index].title }
                  onCloseRequest={ this.closeLightbox.bind(this) }
                  onMovePrevRequest={ this.movePrev.bind(this) }
                  onMoveNextRequest={ this.moveNext.bind(this) } />
        );
    }

    return (
      <div></div>
      );
  }

}

export default ImageComponent;