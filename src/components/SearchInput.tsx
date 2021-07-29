import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EventListener from 'react-event-listener';
import { Search as SearchIcon } from '@material-ui/icons';
import { FormControlLabel, Switch } from '@material-ui/core';

const useStyles = makeStyles({
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
    marginLeft: 10
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
    padding: '8px 8px 8px 45px',
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
});

interface ISearchInputProps {
  onSearch: (value: string) => void;
  onOptionsChange: (options: ISearchOptions) => void;
  searchOptions: ISearchOptions;
}

export interface ISearchOptions {
  xRestrict: boolean;
}

type TSearchOptionsKeys = keyof ISearchOptions;

const SearchInput: React.FC<ISearchInputProps> = props => {
  const classes = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const switchRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (props.searchOptions.xRestrict) {
      switchRef.current?.click();
    }
  }, []);

  const onSearch = () => {
    if (inputRef.current) {
      props.onSearch(inputRef.current.value);
    }
  };

  const onSwitchChange = (
    key: TSearchOptionsKeys,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { searchOptions } = { ...props };
    searchOptions[key] = event.target.checked;
    props.onOptionsChange(searchOptions);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 13 && document.activeElement === inputRef.current) {
      inputRef?.current?.blur();
      onSearch();
    }
  };

  return (
    <div className={classes.searchRoot}>
      <div className={classes.search}>
        <SearchIcon />
      </div>
      <input ref={inputRef} className={classes.searchInput} />
      {process.env.NODE_ENV === 'development' && (
        <div className={classes.searchOptionCheckbox}>
          <FormControlLabel
            style={{ marginLeft: 0 }}
            control={
              <Switch
                ref={switchRef}
                onChange={event => onSwitchChange('xRestrict', event)}
                name="xRestrict"
                color="primary"
              />
            }
            label="R-18"
          />
        </div>
      )}
      <EventListener target="window" onKeyDown={onKeyDown} />
    </div>
  );
};

SearchInput.defaultProps = {
  onSearch() {}
};

export default SearchInput;
