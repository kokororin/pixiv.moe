import React from 'react';
import { connect } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { Done as DoneIcon, Language as LanguageIcon } from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';
import shortid from 'shortid';
import config from '@/config';
import Storage from '@/utils/Storage';
import chooseLocale from '@/locale/chooseLocale';

@connect(state => ({ locale: state.locale }))
export default class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  @autobind
  onLanguageClick(value) {
    Storage.set('lang', value);
    chooseLocale(value, this.props.dispatch);
  }

  @autobind
  onMenuOpen(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  @autobind
  onMenuClose() {
    this.setState({ anchorEl: null });
  }

  renderLanguages() {
    const languages = config.languages;

    return [
      <MenuItem key={shortid.generate()} disabled>
        <FormattedMessage id="Language" />
      </MenuItem>,
      ...languages.map(elem => {
        const lang = Storage.get('lang');
        const highlight = elem.value === lang;

        return (
          <MenuItem
            key={elem.value}
            onClick={() => {
              this.onLanguageClick(elem.value);
              this.onMenuClose();
            }}>
            {highlight && <DoneIcon style={{ color: '#4caf50' }} />}
            {elem.name}
          </MenuItem>
        );
      })
    ];
  }

  render() {
    return (
      <>
        <IconButton color="inherit" onClick={this.onMenuOpen}>
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(this.state.anchorEl)}
          onClose={this.onMenuClose}>
          {this.renderLanguages()}
        </Menu>
      </>
    );
  }
}
