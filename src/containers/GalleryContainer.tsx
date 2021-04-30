import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
  ListSubheader,
  Button
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Done as DoneIcon,
  Cached as CachedIcon
} from '@material-ui/icons';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { useObserver } from 'mobx-react-lite';

import config from '../config';

import InfiniteScroll from '../components/InfiniteScroll';
import GalleryList from '../components/GalleryList';
import Loading from '../components/Loading';
import Refresh from '../components/Refresh';
import Message from '../components/Message';
import LanguageSelector from '../components/LanguageSelector';
import SearchInput, { ISearchOptions } from '../components/SearchInput';
import Content, { IContentHandles } from '../components/Content';
import Storage from '../utils/Storage';
// import * as api from '../utils/api';

import LoginContainer, {
  ILoginContainerHandles,
  UserButton
} from './LoginContainer';

import { GalleryContext } from '../stores/GalleryStore';

export const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  toolbarTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
  },
  refreshBtn: {
    textAlign: 'center'
  }
});

const GalleryContainer: React.FC<{}> = () => {
  const classes = useStyles();
  const intl = useIntl();
  const location = useLocation();
  const history = useHistory();
  const gallery = React.useContext(GalleryContext);
  const [shouldLogin] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [searchOptions, setSearchOptions] = React.useState<ISearchOptions>({
    xRestrict: Storage.get('x_restrict') || false
  });
  const loginRef = React.useRef<ILoginContainerHandles>(null);
  const contentRef = React.useRef<IContentHandles>(null);

  if (!gallery) {
    return null;
  }

  const fetchSource = (isFirstLoad: boolean) => {
    if (isFirstLoad) {
      gallery.page = 1;
    }
    gallery.xRestrict = searchOptions.xRestrict;
    gallery.fetchSource();
  };

  const onLoadMore = () => {
    if (gallery.errorTimes < 3) {
      fetchSource(false);
    }
  };

  const reRenderContent = () => {
    gallery.errorTimes = 0;
    gallery.clearSource();
    contentRef?.current?.toTop();
    fetchSource(true);
  };

  const fetchTags = () => {
    if (gallery.tags.length === 0) {
      gallery.fetchTags();
    }
  };

  const onSearch = (word: string) => {
    if (!word) {
      return;
    }
    if (!isNaN(parseFloat(word)) && isFinite(Number(word))) {
      history.push(`/illust/${word}`);
    } else {
      Storage.set('word', word);
      gallery.clearErrorTimes();
      gallery.clearSource();
      gallery.setWord(word);
      contentRef?.current?.toTop();
      fetchSource(true);
    }
  };

  const onSearchOptionsChange = (options: ISearchOptions) => {
    Storage.set('x_restrict', options.xRestrict);
    console.log(options);
    setSearchOptions(options);
  };

  const onKeywordClick = (word: string) => {
    gallery.setWord(word);
    reRenderContent();
    Storage.set('word', word);
  };

  React.useEffect(() => {
    // if (!api.getAuth()) {
    //   setShouldLogin(true);
    //   loginRef.current?.open(() => {
    //     window.location.reload();
    //   });
    //   return;
    // }
    // setShouldLogin(false);

    if (gallery.fromIllust) {
      onSearch(gallery.word);
      gallery.setFromIllust(false);
    } else {
      const search = new URLSearchParams(location.search);
      if (search.get('entry') === 'ranking') {
        gallery.setWord('ranking');
        Storage.set('word', 'ranking');
      } else {
        const cachedWord = Storage.get('word');
        gallery.setWord(cachedWord ? cachedWord : 'ranking');
      }
      if (gallery.items.length === 0) {
        fetchSource(true);
      }
      fetchTags();
    }
  }, []);

  const renderKeywords = () => {
    const keywords = [...gallery.tags];
    keywords.unshift({ tag: 'ranking' });

    if (gallery.isFetchingTags) {
      return <Loading />;
    }

    const word = String(gallery.word);
    let found = false;
    for (const item of keywords) {
      if (item.tag === word) {
        found = true;
        break;
      }
    }

    return (
      <>
        {!found && word !== 'ranking' && word.trim() !== '' && (
          <ListItem button onClick={() => onKeywordClick(word)}>
            <ListItemIcon>
              <DoneIcon style={{ color: '#4caf50' }} />
            </ListItemIcon>
            <ListItemText style={{ fontWeight: 'bold' }} primary={word} />
          </ListItem>
        )}
        {keywords.map(elem => {
          const ranking = elem.tag === 'ranking';
          const highlight =
            elem.tag === gallery.word ||
            (gallery.word === 'ranking' && ranking);

          return (
            <ListItem
              key={elem.tag}
              button
              onClick={() => onKeywordClick(ranking ? 'ranking' : elem.tag)}>
              {highlight && (
                <ListItemIcon>
                  <DoneIcon style={{ color: '#4caf50' }} />
                </ListItemIcon>
              )}
              <ListItemText
                style={{ fontWeight: 'bold' }}
                primary={
                  ranking ? intl.formatMessage({ id: 'Ranking' }) : elem.tag
                }
              />
            </ListItem>
          );
        })}
      </>
    );
  };

  const onHeaderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    if (
      typeof target.className === 'string' &&
      target.className.indexOf(classes.toolbar) > -1
    ) {
      contentRef?.current?.toTop();
    }
  };

  const onToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return useObserver(() => (
    <>
      <Helmet>
        <title>{config.siteTitle}</title>
      </Helmet>
      <AppBar position="static" onClick={onHeaderClick}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            onClick={onToggleDrawer}
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
            onSearch={onSearch}
            onOptionsChange={onSearchOptionsChange}
            searchOptions={searchOptions}
          />
          <LanguageSelector />
          <UserButton onClick={() => loginRef.current?.open()} />
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={onToggleDrawer}>
        <div
          tabIndex={0}
          role="button"
          onClick={onToggleDrawer}
          onKeyDown={onToggleDrawer}>
          <List
            subheader={
              <ListSubheader disableSticky>
                {intl.formatMessage({ id: 'Tags' })}
              </ListSubheader>
            }>
            {renderKeywords()}
          </List>
        </div>
      </Drawer>
      <Content ref={contentRef}>
        {shouldLogin ? (
          <Message
            code={403}
            text={intl.formatMessage({
              id: 'Please sign in to continue'
            })}
          />
        ) : (
          <InfiniteScroll
            distance={200}
            onLoadMore={onLoadMore}
            isLoading={gallery.isFetching}
            hasMore>
            <div className={classes.root}>
              {gallery.items.length === 0 && gallery.isFetching && <Loading />}
              <GalleryList items={gallery.items} />
              {gallery.items.length > 0 && gallery.isFetching && <Loading />}
              {gallery.isError && (
                <>
                  <Message
                    text={
                      gallery.errorMsg
                        ? gallery.errorMsg
                        : intl.formatMessage({ id: 'Failed to Load' })
                    }
                  />
                  <div className={classes.refreshBtn}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<CachedIcon />}
                      onClick={() => window.location.reload()}>
                      {intl.formatMessage({ id: 'Refresh page' })}
                    </Button>
                  </div>
                </>
              )}
              <Refresh onClick={reRenderContent} />
            </div>
          </InfiniteScroll>
        )}
      </Content>
      <LoginContainer ref={loginRef} />
    </>
  ));
};

export default GalleryContainer;
