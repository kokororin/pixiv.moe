import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Done as DoneIcon,
  Language as LanguageIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';
import shortid from 'shortid';
import config from '@/config';
import Storage from '@/utils/Storage';
import chooseLocale from '@/locale/chooseLocale';

const useStyles = makeStyles({
  language: {
    margin: '0px 4px 0px 8px'
  }
});

interface ILanguageSelectorProps {}

const LanguageSelector: React.SFC<ILanguageSelectorProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const lang = Storage.get('lang');

  const onLanguageClick = (value: string) => {
    Storage.set('lang', value);
    chooseLocale(value, dispatch);
  };

  const onMenuOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" onClick={onMenuOpen}>
        <LanguageIcon />
        <span className={classes.language}>{lang}</span>
        <ExpandMoreIcon fontSize="small" />
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}>
        {[
          <MenuItem key={shortid.generate()} disabled>
            <FormattedMessage id="Language" />
          </MenuItem>,
          ...config.languages.map(elem => {
            const highlight = elem.value === lang;

            return (
              <MenuItem
                key={elem.value}
                onClick={() => {
                  onLanguageClick(elem.value);
                  onMenuClose();
                }}>
                {highlight && <DoneIcon style={{ color: '#4caf50' }} />}
                {elem.name}
              </MenuItem>
            );
          })
        ]}
      </Menu>
    </>
  );
};

export default LanguageSelector;
