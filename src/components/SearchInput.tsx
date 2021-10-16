import React, { useRef } from 'react';
import { useMount } from 'ahooks';
import makeStyles from '@mui/styles/makeStyles';
import { useKeyPress } from 'ahooks';
import { Search as SearchIcon } from '@mui/icons-material';
import { FormControlLabel, Switch } from '@mui/material';

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
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    zIndex: 99
  }
});

interface SearchInputProps {
  onSearch: (value: string) => void;
  onOptionsChange: (options: SearchOptions) => void;
  searchOptions: SearchOptions;
}

export interface SearchOptions {
  xRestrict: boolean;
}

type SearchOptionsKeys = keyof SearchOptions;

const SearchInput: React.FC<SearchInputProps> = props => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const switchRef = useRef<HTMLButtonElement>(null);

  useMount(() => {
    if (props.searchOptions.xRestrict) {
      switchRef.current?.click();
    }
  });

  const onSearch = () => {
    if (inputRef.current) {
      props.onSearch(inputRef.current.value);
    }
  };

  const onSwitchChange = (
    key: SearchOptionsKeys,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { searchOptions } = { ...props };
    searchOptions[key] = event.target.checked;
    props.onOptionsChange(searchOptions);
  };

  useKeyPress(
    'enter',
    () => {
      inputRef?.current?.blur();
      onSearch();
    },
    {
      target: inputRef.current
    }
  );

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
    </div>
  );
};

SearchInput.defaultProps = {
  onSearch() {}
};

export default SearchInput;
