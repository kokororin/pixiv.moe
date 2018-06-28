import styles from '@/styles/Gallery.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import EventListener from 'react-event-listener';
import SearchIcon from '@material-ui/icons/Search';

@CSSModules(styles, { allowMultiple: true })
export default class SearchInput extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func
  };

  static defaultProps = {
    onSearch() {}
  };

  constructor(props) {
    super(props);
  }

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
    return (
      <div styleName="search-root">
        <div styleName="search">
          <SearchIcon />
        </div>
        <input ref={ref => (this.inputRef = ref)} styleName="search-input" />
        <EventListener target="window" onKeyDown={this.onKeyDown} />
      </div>
    );
  }
}
