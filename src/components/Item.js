import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import StarIcon from '@material-ui/icons/Star';

const styles = {
  cell: {
    width: 175,
    minHeight: 100,
    padding: 0,
    background: '#fff',
    margin: 8,
    marginTop: 10,
    fontSize: 12,
    boxShadow:
      '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
    textAlign: 'center',
    '&:hover': {
      boxShadow: '0 1px 5px rgba(34, 25, 25, 0.8)'
    },
    '@media screen and (max-width: 400px)': {
      width: 160
    },
    '@media screen and (max-width: 320px)': {
      width: 140
    }
  },
  link: {
    textDecoration: 'none'
  },
  imageWrapper: {
    overflow: 'hidden',
    '& img': {
      display: 'block',
      width: '100%',
      height: '100%',
      border: 0,
      maxWidth: '100%',
      background: '#ccc',
      transition: 'opacity 0.5s ease, transform 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    }
  },
  title: {
    margin: '1px 0',
    fontSize: 16,
    lineHeight: 1,
    '& span': {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#000',
      textDecoration: 'none'
    }
  },
  meta: {
    lineHeight: 1,
    padding: '0 0 1px',
    margin: '8px 0',
    fontSize: 10,
    '& span': {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#000',
      textDecoration: 'none'
    },
    '& svg': {
      fontSize: 10
    }
  },
  count: {
    color: '#0069b1 !important',
    backgroundColor: '#cceeff',
    borderRadius: 3,
    margin: '0 1px',
    padding: '0 6px'
  },
  rankNum: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16
  },
  rankTextOuter: {
    color: '#757575',
    verticalAlign: 1,
    marginLeft: 3
  },
  noPreviousRank: {
    color: '#f44336'
  }
};

@withStyles(styles)
export default class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    masonry: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
  }

  get classes() {
    return this.props.classes;
  }

  onImageMouseMove(event) {
    event = event.nativeEvent;
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
      target.style.transformOrigin = `${event.offsetX}px ${event.offsetY}px`;
    }
  }

  @autobind
  onImageError() {
    this.imgRef.src = require('@/images/img-fail.jpg');
    typeof this.props.masonryRef !== 'undefined' &&
      this.props.masonryRef.performLayout();
  }

  renderRankText() {
    const { classes } = this.props;
    if (this.props.item.previous_rank === 0) {
      return (
        <span
          className={classNames(classes.rankTextOuter, classes.noPreviousRank)}>
          <FormattedMessage id="Debut" />
        </span>
      );
    }

    const icon =
      this.props.item.previous_rank < this.props.item.rank ? (
        <TrendingDownIcon style={{ color: '#3f51b5' }} />
      ) : (
        <TrendingUpIcon style={{ color: '#d32f2f' }} />
      );

    return (
      <span className={classes.rankTextOuter}>
        {icon}
        <FormattedMessage
          id="Yesterday x rank"
          values={{ rank: this.props.item.previous_rank }}
        />
      </span>
    );
  }

  render() {
    const isRank = this.props.item.hasOwnProperty('work');
    const classes = this.props.classes;

    return (
      <div className={classes.cell} onMouseMove={this.onImageMouseMove}>
        <Link
          className={classes.link}
          to={`/illust/${
            isRank ? this.props.item.work.id : this.props.item.id
          }`}>
          <div className={classes.imageWrapper}>
            <img
              ref={ref => (this.imgRef = ref)}
              src={
                isRank
                  ? this.props.item.work.image_urls.px_480mw
                  : this.props.item.image_urls.px_480mw
              }
              onError={this.onImageError}
            />
          </div>
          <div className={classes.title}>
            <span>
              {isRank ? this.props.item.work.title : this.props.item.title}
            </span>
          </div>
          {isRank ? (
            <div className={classes.meta}>
              <span className={classes.rankNum}>
                <FormattedMessage
                  id="x rank"
                  values={{ rank: this.props.item.rank }}
                />
              </span>
              <span>{this.renderRankText()}</span>
            </div>
          ) : (
            <div className={classes.meta}>
              <span className={classes.count}>
                <StarIcon />
                {this.props.item.stats.favorited_count.public +
                  this.props.item.stats.favorited_count.private}
              </span>
            </div>
          )}
        </Link>
      </div>
    );
  }
}
