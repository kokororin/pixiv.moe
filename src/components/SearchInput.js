import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EventListener from 'react-event-listener';
import SearchIcon from '@material-ui/icons/Search';
// import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  searchRoot: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.15)',
    marginLeft: 8,
    marginRight: 16,
    borderRadius: 2,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.25)'
    },
    '&:focus-within $searchInput': {
      '@media screen and (min-width: 650px)': {
        width: 220
      }
    },
    '&:focus-within $searchOptionCheckbox': {
      display: 'block'
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
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  searchOptionCheckbox: {
    position: 'absolute',
    background: '#fff',
    width: '100%',
    color: '#000',
    fontSize: 14,
    display: 'none',
    boxShadow:
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
  }
};

@withStyles(styles)
export default class SearchInput extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func,
    isSearchByPopularity: PropTypes.bool
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
        {/* <div className={classes.searchOptionCheckbox}>
          <Checkbox
            onClick={() => this.props.onCheckBoxChange()}
            checked={this.props.isSearchByPopularity}
            color="primary"
          />
          <span>Search by popularity tags</span>
        </div> */}
        <EventListener target="window" onKeyDown={this.onKeyDown} />
      </div>
    );
  }
}
