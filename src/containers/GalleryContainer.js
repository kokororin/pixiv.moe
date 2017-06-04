import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Layout, Header, Navigation, Drawer, Content, Icon } from 'react-mdl';
import shortid from 'shortid';

import config from '@/config';

import { GalleryActions } from '@/actions';
import { List, Loading, Refresh, Message } from '@/components';
import { scrollTo, Storage } from '@/utils';

@autobind
export class GalleryContainerWithoutStore extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.layoutDOMNode = ReactDOM.findDOMNode(this.layoutRef);
    this.contentDOMNode = this.layoutDOMNode.MaterialLayout.content_;
    this.drawerDOMNode = this.layoutDOMNode.MaterialLayout.drawer_;

    window.addEventListener('resize', this.resizeListener);

    const cachedTag = Storage.get('tag');
    this.props.dispatch(
      GalleryActions.setTag(cachedTag === null ? 'ranking' : cachedTag)
    );

    if (this.props.gallery.items.length === 0) {
      this.fetchSource(true);
    } else {
      this.contentDOMNode.scrollTop = this.props.gallery.contentScrollTop;
    }

    this.resizeListener();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  scrollListener(event) {
    if (this.drawerDOMNode.classList.contains('is-visible')) {
      return;
    }
    const contentScrollTop = this.contentDOMNode.scrollTop;
    this.props.dispatch(GalleryActions.setContentScrollTop(contentScrollTop));
    if (this.props.gallery.isFetching) {
      return;
    }
    const target = event.nativeEvent.target,
      targetHeight = target.clientHeight,
      scrollTop = target.scrollTop,
      scrollHeight = target.scrollHeight;

    if (scrollTop + targetHeight - scrollHeight > -200) {
      this.fetchSource(false);
    }
  }

  async reRenderContent(clearCache) {
    if (clearCache) {
      try {
        const searchResults = await Storage.search('cf_(.*)');
        for (const searchResult of searchResults) {
          Storage.remove(searchResult);
        }
      } catch (e) {}
    }
    this.props.dispatch(GalleryActions.clearSource());
    this.fetchSource(true);
  }

  fetchSource(isFirstLoad) {
    if (isFirstLoad) {
      this.props.dispatch(GalleryActions.setPage(1));
    }
    this.props.dispatch(GalleryActions.fetchSourceIfNeeded());
  }

  resizeListener() {
    /* reset size of masonry-container when window size change */
    const node = this.rootRef,
      cellClassName = 'cell';

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

  onKeywordClick(event) {
    event.nativeEvent.preventDefault();

    this.layoutDOMNode.MaterialLayout.toggleDrawer();
    const tag = event.nativeEvent.target.dataset.tag;
    this.props.dispatch(GalleryActions.setTag(tag));
    this.reRenderContent(false);
    Storage.set('tag', tag);
  }

  renderKeywords() {
    const keywords = config.keywords;

    return keywords.map(elem => {
      let linkStyle = null,
        iconStyle = {
          display: 'none'
        };
      if (elem.en === this.props.gallery.tag) {
        linkStyle = {
          fontWeight: 'bold',
          fontSize: '16px'
        };
        iconStyle = {
          color: '#4caf50',
          display: 'inline-block'
        };
      }
      return (
        <a
          key={shortid.generate()}
          href={'#'}
          style={linkStyle}
          data-tag={elem.en}
          onTouchTap={this.onKeywordClick}
          onClick={this.onKeywordClick}
          className={`nav-link__${elem.en}`}>
          <Icon style={iconStyle} name={'done'} />
          {elem.jp}
        </a>
      );
    });
  }

  onHeaderClick(event) {
    const target = event.nativeEvent.target,
      tagName = target.tagName.toLowerCase(),
      classList = event.nativeEvent.target.classList;

    if (
      !classList.contains('material-icons') &&
      !classList.contains('mdl-layout__drawer-button') &&
      !classList.contains('github-link') &&
      tagName !== 'img'
    ) {
      scrollTo(this.contentDOMNode, 0, 900, 'easeInOutQuint');
    }
  }

  render() {
    return (
      <Layout
        ref={ref => (this.layoutRef = ref)}
        fixedHeader
        onScroll={this.scrollListener}>
        <Header
          onClick={this.onHeaderClick}
          title={<span>{config.siteTitle}</span>}>
          <Navigation>
            <a
              className={'github-link'}
              target={'_blank'}
              href={config.projectLink}>
              <img src={require('@/images/GitHub-Mark-Light-32px.png')} />
            </a>
          </Navigation>
        </Header>
        <Drawer title={'タグ'}>
          <Navigation>
            {this.renderKeywords()}
          </Navigation>
        </Drawer>
        <Content>
          <div ref={ref => (this.rootRef = ref)} style={{ margin: '0 auto' }}>
            <List items={this.props.gallery.items} />
            <Loading isHidden={!this.props.gallery.isFetching} />
            <Message
              ref={ref => (this.errorRef = ref)}
              text={'読み込みに失敗しました'}
              isHidden={!this.props.gallery.isError}
            />
            <Refresh onClick={async () => await this.reRenderContent(true)} />
          </div>
        </Content>
      </Layout>
    );
  }
}

export default connect(state => {
  return {
    gallery: state.gallery
  };
})(GalleryContainerWithoutStore);
