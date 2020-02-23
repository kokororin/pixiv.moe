import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core';
import { Menu as MenuIcon, Done as DoneIcon } from '@material-ui/icons';
import DocumentTitle from 'react-document-title';
import { FormattedMessage, injectIntl } from 'react-intl';

import config from '@/config';

import * as GalleryActions from '@/actions/gallery';
import InfiniteScroll from '@/components/InfiniteScroll';
import GalleryList from '@/components/List';
import Loading from '@/components/Loading';
import Refresh from '@/components/Refresh';
import Message from '@/components/Message';
import LanguageSelector from '@/components/LanguageSelector';
import SearchInput from '@/components/SearchInput';
import Content from '@/components/Content';
import Storage from '@/utils/Storage';
import GithubIcon from '@/icons/Github';

const styles = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  toolbarTitle: {
    flex: 1,
    '@media screen and (max-width: 649px)': {
      display: 'none'
    }
  },
  toolbarMiddle: {
    flex: 1
  },
  root: {
    margin: '0 auto'
    // paddingLeft: 3,
    // paddingRight: 20
  }
};

@connect(state => ({ gallery: state.gallery }))
@injectIntl
@withStyles(styles)
export default class GalleryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
      isSearchByPopularity: false
    };
  }

  componentDidMount() {
    if (this.props.gallery.fromIllust) {
      this.onSearch(this.props.gallery.word);
      this.props.dispatch(GalleryActions.setFromIllust(false));
    } else {
      const cachedWord = Storage.get('word');
      this.props.dispatch(
        GalleryActions.setWord(cachedWord ? cachedWord : 'ranking')
      );

      if (this.props.gallery.items.length === 0) {
        this.fetchSource(true);
      }
    }
  }

  @autobind
  onLoadMore() {
    if (this.props.gallery.errorTimes < 3) {
      this.fetchSource(false);
    }
  }

  @autobind
  reRenderContent() {
    this.props.dispatch(GalleryActions.clearErrorTimes());
    this.props.dispatch(GalleryActions.clearSource());
    this.fetchSource(true);
  }

  fetchSource(isFirstLoad) {
    if (isFirstLoad) {
      this.props.dispatch(GalleryActions.setPage(1));
    }
    this.props.dispatch(
      GalleryActions.fetchSourceIfNeeded(this.state.isSearchByPopularity)
    );
  }

  @autobind
  onSearch(word) {
    if (!word) {
      return;
    }
    Storage.set('word', word);
    this.props.dispatch(GalleryActions.clearErrorTimes());
    this.props.dispatch(GalleryActions.clearSource());
    this.props.dispatch(GalleryActions.setWord(word));
    this.fetchSource(true);
  }

  @autobind
  onKeywordClick(word) {
    this.props.dispatch(GalleryActions.setWord(word));
    this.reRenderContent();
    Storage.set('word', word);
  }

  renderKeywords() {
    const keywords = config.keywords;

    const word = String(this.props.gallery.word);
    let found = false;
    for (const item of keywords) {
      if (item.jp === word) {
        found = true;
        break;
      }
    }

    return (
      <>
        {!found && word !== 'ranking' && word.trim() !== '' && (
          <ListItem button onClick={() => this.onKeywordClick(word)}>
            <ListItemIcon>
              <DoneIcon style={{ color: '#4caf50' }} />
            </ListItemIcon>
            <ListItemText style={{ fontWeight: 'bold' }} primary={word} />
          </ListItem>
        )}
        {keywords.map(elem => {
          const ranking = elem.en === 'ranking';
          const highlight =
            elem.jp === this.props.gallery.word ||
            (this.props.gallery.word === 'ranking' && ranking);

          return (
            <ListItem
              key={elem.en}
              button
              onClick={() =>
                this.onKeywordClick(ranking ? 'ranking' : elem.jp)
              }>
              {highlight && (
                <ListItemIcon>
                  <DoneIcon style={{ color: '#4caf50' }} />
                </ListItemIcon>
              )}
              <ListItemText
                style={{ fontWeight: 'bold' }}
                primary={
                  ranking
                    ? this.props.intl.formatMessage({ id: 'Ranking' })
                    : elem.jp
                }
              />
            </ListItem>
          );
        })}
      </>
    );
  }

  @autobind
  onHeaderClick(event) {
    const target = event.target;
    const tagName = target.tagName.toLowerCase();

    if (
      tagName !== 'button' &&
      tagName !== 'span' &&
      tagName !== 'svg' &&
      tagName !== 'input'
    ) {
      this.contentRef.toTop();
    }
  }

  @autobind
  onToggleDrawer() {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  }

  onCheckBoxChange() {
    this.setState({
      isSearchByPopularity: !this.state.isSearchByPopularity
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <DocumentTitle title={config.siteTitle}>
        <>
          <AppBar position="static" onClick={this.onHeaderClick}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                color="inherit"
                onClick={this.onToggleDrawer}
                aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.toolbarTitle}>
                {config.siteTitle}
              </Typography>
              <div className={classes.toolbarMiddle} />
              <SearchInput
                onSearch={this.onSearch}
                onCheckBoxChange={() => this.onCheckBoxChange()}
                isSearchByPopularity={this.state.isSearchByPopularity}
              />
              <LanguageSelector />
              <IconButton color="inherit" href={config.projectLink}>
                <GithubIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer open={this.state.isDrawerOpen} onClose={this.onToggleDrawer}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.onToggleDrawer}
              onKeyDown={this.onToggleDrawer}>
              <List
                subheader={
                  <ListSubheader disableSticky>
                    <FormattedMessage id="Tags" />
                  </ListSubheader>
                }>
                {this.renderKeywords()}
              </List>
            </div>
          </Drawer>
          <Content onRef={ref => (this.contentRef = ref)}>
            <InfiniteScroll
              distance={200}
              onLoadMore={this.onLoadMore}
              isLoading={this.props.gallery.isFetching}
              hasMore>
              <div ref={ref => (this.rootRef = ref)} className={classes.root}>
                <GalleryList
                  items={this.props.gallery.items}
                  rootRef={this.rootRef}
                />
                <Loading isHidden={!this.props.gallery.isFetching} />
                <Message
                  ref={ref => (this.errorRef = ref)}
                  text={this.props.intl.formatMessage({ id: 'Failed to Load' })}
                  isHidden={!this.props.gallery.isError}
                />
                <Refresh onClick={this.reRenderContent} />
              </div>
            </InfiniteScroll>
          </Content>
        </>
      </DocumentTitle>
    );
  }
}
