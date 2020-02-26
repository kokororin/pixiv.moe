import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import scrollTo from '@/utils/scrollTo';

const styles = createStyles({
  container: {
    width: '100%',
    position: 'relative',
    display: 'inline-block',
    overflowY: 'auto',
    overflowX: 'hidden',
    flexGrow: 1,
    zIndex: 1,
    WebkitOverflowScrolling: 'touch'
  }
});

interface IContentProps extends WithStyles<typeof styles> {
  onRef?: (ref: OriginalContent) => any;
}

export class OriginalContent extends React.Component<IContentProps> {
  static defaultProps = {
    onRef() {}
  };

  containerRef: HTMLDivElement;

  componentDidMount() {
    this.props.onRef!(this);
  }

  toTop() {
    scrollTo(this.containerRef, 0, 900, 'easeInOutQuint');
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        ref={ref => (this.containerRef = ref as HTMLDivElement)}
        className={classes.container}
        data-component="Content">
        {this.props.children}
      </div>
    );
  }
}

const Content = withStyles(styles)(OriginalContent);

export default Content;
