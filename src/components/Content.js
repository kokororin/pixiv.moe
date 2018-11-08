import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import scrollTo from '@/utils/scrollTo';

const styles = {
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
};

@withStyles(styles)
export default class Content extends React.Component {
  static propTypes = {
    onRef: PropTypes.func
  };

  static defaultProps = {
    onRef() {}
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  toTop() {
    scrollTo(this.containerRef, 0, 900, 'easeInOutQuint');
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        ref={ref => (this.containerRef = ref)}
        className={classes.container}
        data-component="Content">
        {this.props.children}
      </div>
    );
  }
}
