import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EventListener from 'react-event-listener';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  searchRoot: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.15)',
    marginLeft: 8,
    marginRight: 16,
    borderRadius: 2,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.25)'
    }
  },
  search: {
    width: 72,
    height: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    pointerEvents: 'none',
    justifyContent: 'center'
  },
  searchInput: {
    font: 'inherit',
    color: 'inherit',
    width: 100,
    '@media screen and (max-width: 321px)': {
      width: 55
    },
    border: 0,
    margin: 0,
    padding: '8px 8px 8px 72px',
    outline: 0,
    display: 'block',
    background: 'none',
    whiteSpace: 'normal',
    verticalAlign: 'middle',
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:focus': {
      '@media screen and (min-width: 650px)': {
        width: 220
      }
    }
  }
};

@withStyles(styles)
export default class SearchInput extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func
  };

  static defaultProps = {
    onSearch() {}
  };

  @autobind
  onKeyDown(event) {
    if (event.keyCode === 13 && document.activeElement === this.inputRef) {
      this.inputRef.blur();
      this.onSearch();
    }
  }

  onSearch() {
    this.props.onSearch(this.inputRef.value);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.searchRoot}>
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <input
          ref={ref => (this.inputRef = ref)}
          className={classes.searchInput}
        />
        <EventListener target="window" onKeyDown={this.onKeyDown} />
      </div>
    );
  }
}
