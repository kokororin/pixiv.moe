import galleryStyles from '@/styles/Gallery.scss';
import itemStyles from '@/styles/Item.scss';

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DoneIcon from '@material-ui/icons/Done';
import GithubIcon from '@material-ui/docs/svgIcons/Github';
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
import ScrollContext from '@/components/ScrollContext';
import scrollTo from '@/utils/scrollTo';
import Storage from '@/utils/Storage';

@connect(state => ({ gallery: state.gallery }))
@injectIntl
@CSSModules(galleryStyles, { allowMultiple: true })
export default class GalleryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);

    const cachedTag = Storage.get('tag');
    this.props.dispatch(
      GalleryActions.setTag(cachedTag ? 'ranking' : cachedTag)
    );

    if (this.props.gallery.items.length === 0) {
      this.fetchSource(true);
    }

    this.resizeListener();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  @autobind
  onLoadMore() {
    if (this.props.gallery.errorTimes < 3) {
      this.fetchSource(false);
    }
  }

  @autobind
  async reRenderContent(clearCache) {
    if (clearCache) {
      try {
        const searchResults = await Storage.search('cf_(.*)');
        for (const searchResult of searchResults) {
          Storage.remove(searchResult);
        }
      } catch (e) {}
    }
    this.props.dispatch(GalleryActions.clearErrorTimes());
    this.props.dispatch(GalleryActions.clearSource());
    this.fetchSource(true);
  }

  fetchSource(isFirstLoad) {
    if (isFirstLoad) {
      this.props.dispatch(GalleryActions.setPage(1));
    }
    this.props.dispatch(GalleryActions.fetchSourceIfNeeded());
  }

  @autobind
  resizeListener() {
    /* reset size of masonry-container when window size change */
    const node = this.rootRef,
      cellClassName = itemStyles.cell;

    // try to get cell width
    const temp = document.createElement('div');
    temp.setAttribute('class', cellClassName);
    document.body.appendChild(temp);

    const cellWidth = temp.offsetWidth,
      cellMargin = 8,
      componentWidth = cellWidth + 2 * cellMargin,
      maxn = Math.floor(document.body.offsetWidth / componentWidth);

    try {
      node.style.width = String(`${maxn * componentWidth}px`);
    } catch (e) {}

    document.body.removeChild(temp);
  }

  @autobind
  onKeywordClick(tag) {
    this.props.dispatch(GalleryActions.setTag(tag));
    this.reRenderContent(false);
    Storage.set('tag', tag);
  }

  renderKeywords() {
    const keywords = config.keywords;

    return keywords.map(elem => {
      const highlight = elem.en === this.props.gallery.tag;

      return (
        <ListItem
          key={elem.en}
          button
          onClick={() => this.onKeywordClick(elem.en)}>
          {highlight && (
            <ListItemIcon>
              <DoneIcon style={{ color: '#4caf50' }} />
            </ListItemIcon>
          )}
          <ListItemText
            style={{ fontWeight: 'bold' }}
            primary={
              elem.en === 'ranking'
                ? this.props.intl.formatMessage({ id: 'Ranking' })
                : elem.jp
            }
          />
        </ListItem>
      );
    });
  }

  @autobind
  onHeaderClick(event) {
    const target = event.target;
    const tagName = target.tagName.toLowerCase();

    if (tagName !== 'button' && tagName !== 'span' && tagName !== 'svg') {
      scrollTo(
        document.querySelector(`.${ScrollContext.scrollingClassName}`),
        0,
        900,
        'easeInOutQuint'
      );
    }
  }

  @autobind
  onToggleDrawer() {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  }

  render() {
    return (
      <DocumentTitle title={config.siteTitle}>
        <React.Fragment>
          <div styleName="appbar-root">
            <AppBar position="static" onClick={this.onHeaderClick}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={this.onToggleDrawer}
                  aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  styleName="appbar-title">
                  {config.siteTitle}
                </Typography>
                <LanguageSelector />
                <IconButton color="inherit" href={config.projectLink}>
                  <GithubIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
          <Drawer open={this.state.isDrawerOpen} onClose={this.onToggleDrawer}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.onToggleDrawer}
              onKeyDown={this.onToggleDrawer}>
              <List
                subheader={
                  <ListSubheader>
                    <FormattedMessage id="Tags" />
                  </ListSubheader>
                }>
                {this.renderKeywords()}
              </List>
            </div>
          </Drawer>
          <InfiniteScroll
            distance={200}
            onLoadMore={this.onLoadMore}
            isLoading={this.props.gallery.isFetching}
            hasMore>
            <ScrollContext.Container>
              <div
                ref={ref => (this.rootRef = ref)}
                style={{ margin: '0 auto' }}>
                <GalleryList items={this.props.gallery.items} />
                <Loading isHidden={!this.props.gallery.isFetching} />
                <Message
                  ref={ref => (this.errorRef = ref)}
                  text={this.props.intl.formatMessage({ id: 'Failed to Load' })}
                  isHidden={!this.props.gallery.isError}
                />
                <Refresh onClick={() => this.reRenderContent(true)} />
              </div>
            </ScrollContext.Container>
          </InfiniteScroll>
        </React.Fragment>
      </DocumentTitle>
    );
  }
}
