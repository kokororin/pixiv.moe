import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
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
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl';

import config from '@/config';

import * as GalleryActions from '@/actions/gallery';
import { IGalleryAction, TGalleryThunkDispatch } from '@/actions/gallery';
import InfiniteScroll from '@/components/InfiniteScroll';
import GalleryList from '@/components/List';
import Loading from '@/components/Loading';
import Refresh from '@/components/Refresh';
import Message from '@/components/Message';
import LanguageSelector from '@/components/LanguageSelector';
import SearchInput from '@/components/SearchInput';
import Content, { OriginalContent } from '@/components/Content';
import Storage from '@/utils/Storage';
import GithubIcon from '@/icons/Github';

import { ICombinedState } from '@/reducers';
import { IGalleryState } from '@/reducers/gallery';

const styles = createStyles({
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
});

interface IGalleryContainerProps extends WithStyles<typeof styles> {
  dispatch: Dispatch<IGalleryAction> & TGalleryThunkDispatch;
  intl: InjectedIntl;
  gallery: IGalleryState;
}

interface IGalleryContainerState {
  isDrawerOpen: boolean;
  isSearchByPopularity: boolean;
}

class GalleryContainer extends React.Component<
  IGalleryContainerProps,
  IGalleryContainerState
> {
  contentRef: OriginalContent;
  rootRef: HTMLDivElement;

  constructor(props: IGalleryContainerProps) {
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

  onLoadMore = () => {
    if (this.props.gallery.errorTimes < 3) {
      this.fetchSource(false);
    }
  };

  reRenderContent = () => {
    this.props.dispatch(GalleryActions.clearErrorTimes());
    this.props.dispatch(GalleryActions.clearSource());
    this.fetchSource(true);
  };

  fetchSource(isFirstLoad: boolean) {
    if (isFirstLoad) {
      this.props.dispatch(GalleryActions.setPage(1));
    }
    this.props.dispatch(GalleryActions.fetchSourceIfNeeded());
  }

  onSearch = (word: string) => {
    if (!word) {
      return;
    }
    Storage.set('word', word);
    this.props.dispatch(GalleryActions.clearErrorTimes());
    this.props.dispatch(GalleryActions.clearSource());
    this.props.dispatch(GalleryActions.setWord(word));
    this.fetchSource(true);
  };

  onKeywordClick = (word: string) => {
    this.props.dispatch(GalleryActions.setWord(word));
    this.reRenderContent();
    Storage.set('word', word);
  };

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

  onHeaderClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement;
    const tagName = target.tagName.toLowerCase();

    if (
      tagName !== 'button' &&
      tagName !== 'span' &&
      tagName !== 'svg' &&
      tagName !== 'input'
    ) {
      this.contentRef.toTop();
    }
  };

  onToggleDrawer = () => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  };

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
              <div
                ref={ref => (this.rootRef = ref as HTMLDivElement)}
                className={classes.root}>
                <GalleryList items={this.props.gallery.items} />
                <Loading isHidden={!this.props.gallery.isFetching} />
                <Message
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

export default connect((state: ICombinedState) => ({ gallery: state.gallery }))(
  injectIntl(withStyles(styles)(GalleryContainer))
);
