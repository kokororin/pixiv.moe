import React, { Component, ReactNode } from 'react';
import { CircularProgress } from '@mui/material';
import { common, grey } from '@mui/material/colors';
import BrokenImage from '@mui/icons-material/BrokenImage';

interface ImageProps {
  /** Duration of the fading animation, in milliseconds. */
  animationDuration?: number;
  /** Override aspect ratio. */
  aspectRatio?: number;
  /** Override the background color. */
  color?: string;
  /** Disables the error icon if set to true. */
  disableError?: boolean;
  /** Disables the loading spinner if set to true. */
  disableSpinner?: boolean;
  /** Disables the transition after load if set to true. */
  disableTransition?: boolean;
  /** Override the error icon. */
  errorIcon?: ReactNode;
  /** Override the inline-styles of the container that contains the loading spinner and the error icon. */
  iconContainerStyle?: any;
  /** Override the inline-styles of the image. */
  imageStyle?: any;
  /** Override the loading component. */
  loading?: ReactNode;
  /** Fired when the user clicks on the image happened. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => any;
  /** Fired when the image failed to load. */
  onError?: (event?: any) => any;
  /** Fired when the image finished loading. */
  onLoad?: () => any;
  /** Specifies the URL of an image. */
  src: string;
  /** Override the inline-styles of the root element. */
  style?: any;
}

interface ImageState {
  imageError: boolean;
  imageLoaded: boolean;
  src: string;
}

/**
 * Images are ugly until they're loaded. Materialize it with material image! It will fade in like the material image loading pattern suggests.
 * @see [Image loading patterns](https://material.io/guidelines/patterns/loading-images.html)
 */
export default class Image extends Component<ImageProps, ImageState> {
  static defaultProps = {
    animationDuration: 3000,
    aspectRatio: 1,
    color: common.white,
    disableError: false,
    disableSpinner: false,
    disableTransition: false,
    errorIcon: (
      <BrokenImage style={{ width: 48, height: 48, color: grey[300] }} />
    ),
    loading: <CircularProgress size={48} />
  };

  constructor(props: ImageProps) {
    super(props);
    this.state = {
      imageError: false,
      imageLoaded: false,
      src: this.props.src
    };
  }

  static getDerivedStateFromProps(props: ImageProps, state: ImageState) {
    if (state.src !== props.src) {
      return {
        imageError: false,
        imageLoaded: false,
        src: props.src
      };
    }
    return null;
  }

  getStyles() {
    const {
      animationDuration,
      aspectRatio,
      color,
      imageStyle,
      disableTransition,
      iconContainerStyle,
      style
    } = this.props;

    const imageTransition = !disableTransition && {
      opacity: this.state.imageLoaded ? 1 : 0,
      filterBrightness: this.state.imageLoaded ? 100 : 0,
      filterSaturate: this.state.imageLoaded ? 100 : 20,
      transition: `
        filterBrightness ${
          // @ts-ignore
          animationDuration * 0.75
        }ms cubic-bezier(0.4, 0.0, 0.2, 1),
        filterSaturate ${animationDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1),
        opacity ${
          // @ts-ignore
          animationDuration / 2
        }ms cubic-bezier(0.4, 0.0, 0.2, 1)`
    };

    const styles = {
      root: {
        backgroundColor: color,
        paddingTop: `calc(1 / ${aspectRatio} * 100%)`,
        position: 'relative',
        ...style
      },
      image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        ...imageTransition,
        ...imageStyle
      },
      iconContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        ...iconContainerStyle
      }
    };

    return styles;
  }

  handleLoadImage = () => {
    this.setState({ imageLoaded: true });
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  handleImageError = () => {
    if (this.props.src) {
      this.setState({ imageError: true });
      if (this.props.onError) {
        this.props.onError();
      }
    }
  };

  render() {
    const styles = this.getStyles();

    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      animationDuration,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      aspectRatio,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      color,
      disableError,
      disableSpinner,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      disableTransition,
      errorIcon,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      imageStyle,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      style,
      loading,
      onClick,
      ...image
    } = this.props;

    return (
      <div style={styles.root} onClick={onClick}>
        {image.src && (
          <img
            {...image}
            style={styles.image}
            onLoad={this.handleLoadImage}
            onError={this.handleImageError}
          />
        )}
        <div style={styles.iconContainer}>
          {!disableSpinner &&
            !this.state.imageLoaded &&
            !this.state.imageError &&
            loading}
          {!disableError && this.state.imageError && errorIcon}
        </div>
      </div>
    );
  }
}
