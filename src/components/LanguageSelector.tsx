import React, { useState, useContext } from 'react';
import { Button, Menu, MenuItem, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Language as LanguageIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import { useIntl } from 'react-intl';
import { useObserver } from 'mobx-react-lite';
import shortid from 'shortid';
import * as config from '../config';
import Storage from '../utils/Storage';
import chooseLocale from '../locale/chooseLocale';
import { LocaleContext } from '../stores/LocaleStore';

const useStyles = makeStyles({
  language: {
    margin: '0px 4px 0px 8px'
  }
});

const LanguageSelector: React.FC<{}> = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const classes = useStyles();
  const locale = useContext(LocaleContext);

  const intl = useIntl();

  const lang = locale.lang;

  const onLanguageClick = (value: string) => {
    Storage.set('lang', value);
    chooseLocale(value, locale.setLocale);
  };

  const onMenuOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  return useObserver(() => (
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
            {intl.formatMessage({ id: 'Language' })}
          </MenuItem>,
          ...config.languages.map(elem => {
            return (
              <MenuItem
                key={elem.value}
                selected={elem.value === lang}
                onClick={() => {
                  onLanguageClick(elem.value);
                  onMenuClose();
                }}>
                {elem.name}
              </MenuItem>
            );
          }),
          <Box key={shortid.generate()} my={1}>
            <Divider />
          </Box>,
          <MenuItem
            key={shortid.generate()}
            component="a"
            href={config.translateLink}
            target="_blank">
            {intl.formatMessage({ id: 'HelpToTranslate' })}
          </MenuItem>
        ]}
      </Menu>
    </>
  ));
};

export default LanguageSelector;
