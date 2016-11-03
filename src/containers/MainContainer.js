import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import shortid from 'shortid';
import time from 'locutus/php/datetime/time';

import config from 'config';

import { Alert, Account, Image, List, Loading, Refresh, Message } from '../components';
import { LoginContainer } from '../containers';
import { cachedFetch, preloadImg, scrollTo, Storage } from '../utils';


export default class MainContainer extends React.Component {

  constructor(props) {
    super(props);

    const cachedTag = Storage.get('tag');
    this.state = {
      isLoading: false,
      currentPage: 0,
      currentTag: cachedTag === null ? 'lovelive' : cachedTag,
      isFirstLoadCompleted: false,
      lastId: 0,
      newCount: 0,
      items: [],
      images: []
    };

    this.scrollListener = ::this.scrollListener;
    this.reRenderContent = ::this.reRenderContent;
    this.resizeListener = ::this.resizeListener;
    this.onImageClick = ::this.onImageClick;
    this.onFavouriteClick = ::this.onFavouriteClick;
    this.onKeywordClick = ::this.onKeywordClick;
    this.onHeaderClick = ::this.onHeaderClick;

    Promise.resolve()
      .then(() => {
        [
          '../images/img-loading.jpg',
          '../images/img-fail.jpg'
        ]
          .map((elem) => preloadImg(elem));
      });

  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);

    this.fetchSource(true);
    this.resizeListener();
  // setInterval(this.updateLatent, 10e3);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  scrollListener(event) {
    if (this.state.isLoading) {
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
      const searchResults = await Storage.search('cf_(.*)');
      for (const searchResult of searchResults) {
        Storage.remove(searchResult);
      }
    }
    this.setState({
      items: [],
      images: [],
      newCount: 0
    }, () => {
      window.document.title = config.siteTitle;
      this.fetchSource(true);
    });
  }

  fetchSource(isFirstLoad) {
    return new Promise((resolve) => {
      if (this.state.isLoading) {
        return;
      }
      this.errorRef.hide();
      this.setState({
        isLoading: true
      });
      let currentPage = isFirstLoad ? 0 : this.state.currentPage;
      cachedFetch(config.sourceURL, {
        mode: 'cors',
        timeout: 10e3,
        expiryKey: 'expires_at',
        query: {
          sort: 'popular',
          tag: this.state.currentTag,
          page: ++currentPage
        }
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('response is not OK');
        })
        .then((data) => {
          if (data.status === 'success' && data.count > 0) {
            Object.keys(data.response).map((key) => {
              const elem = data.response[key];
              if (isFirstLoad && key === 0) {
                this.setState({
                  lastId: elem.id
                });
              }
              this.setState({
                items: [...this.state.items, ...[elem]],
                images: [...this.state.images, ...[{
                  uri: elem.image_urls.px_480mw,
                  title: elem.title,
                  link: `/#/${elem.id}`
                }]]
              });
            });
          } else {
            this.errorRef.show();
          }
        })
        .then(() => {
          if (isFirstLoad) {
            this.setState({
              isFirstLoadCompleted: true
            });
          }
        })
        .then(() => {
          this.setState({
            isLoading: false,
            currentPage: currentPage
          })
        })
        .then(() => resolve())
        .catch(() => {
          this.setState({
            isLoading: false
          });
          this.errorRef.show();
        });
    });

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
    } catch ( e ) {}

    document.body.removeChild(temp);
  }

  /**
   * @deprecated
   */
  updateLatent() {
    // if (this.state.isFirstLoadCompleted && this.state.lastId !== 0) {
    //   fetch(`${config.sourceURL}?last=${this.state.lastId}&t=${+new Date()}`, {
    //     mode: 'cors'
    //   })
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //       }
    //     })
    //     .then((data) => {
    //       if (data.status === 'success' && data.new_latent_count) {
    //         const count = parseInt(data.new_latent_count,10);
    //         if (count > 0) {
    //           setTimeout(() => {
    //             for (let key in data.response) {
    //               key = parseInt(key,10);
    //               const elem = data.response[key];
    //               if (key === count) {
    //                 break;
    //               }
    //               if (key === 0) {
    //                 this.setState({
    //                   lastId: elem.id
    //                 });
    //               }
    //               this.setState({
    //                 newCount: this.state.newCount + 1
    //               });
    //             }

    //             window.document.title = `(${this.state.newCount}) ${config.siteTitle}`;
    //           }, 1500);
    //         }
    //       }
    //     });
    // }
  }

  onImageClick(index) {
    this.imageRef.openLightbox(index);
  }

  onFavouriteClick(illustId, event) {
    const authData = Storage.get('auth');
    if (authData === null || authData.expires_at < time()) {
      return this.loginRef.open();
    }
    const target = event.nativeEvent.target,
      body = document.body;
    if (target.classList.contains('fn-wait')) {
      return;
    }
    target.classList.add('fn-wait');
    body.classList.add('fn-wait');
    cachedFetch(config.favouriteURL, {
      mode: 'cors',
      method: 'post',
      timeout: 10e3,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Token': authData.access_token
      },
      body: JSON.stringify({
        illust_id: illustId
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        target.classList.remove('fn-wait');
        body.classList.remove('fn-wait');
        this.alertRef.setContent(data.message);
      })
      .catch(() => {
        target.classList.remove('fn-wait');
        body.classList.remove('fn-wait');
        // text from SIF
        this.alertRef.setContent('通信エラーが発生しました');
      });
  }


  onKeywordClick(event) {
    event.nativeEvent.preventDefault();

    ReactDOM.findDOMNode(this.layoutRef).MaterialLayout.toggleDrawer();

    this.setState({
      currentTag: event.nativeEvent.target.dataset.tag
    }, () => {
      this.reRenderContent(false);
      Storage.set('tag', this.state.currentTag);
    });
  }

  renderKeywords() {
    const keywords = config.keywords;
    return keywords.map((elem) => {
      return <a
               key={ shortid.generate() }
               href={ '#' }
               style={ { fontWeight: elem.en === this.state.currentTag ? 'bold' : 'normal' } }
               data-tag={ elem.en }
               onClick={ this.onKeywordClick }>
               { elem.jp }
             </a>;
    });
  }

  onHeaderClick(event) {
    const target = event.nativeEvent.target,
      tagName = target.tagName.toLowerCase(),
      classList = event.nativeEvent.target.classList;

    if (!classList.contains('material-icons')
      && !classList.contains('mdl-layout__drawer-button')
      && !classList.contains('github-link')
      && tagName !== 'img') {
      const node = ReactDOM.findDOMNode(this.layoutRef).querySelector('.mdl-layout__content');
      scrollTo(node, 0, 900, 'easeInOutQuint');
    }
  }

  render() {
    return (
      <Layout
        ref={ (ref) => this.layoutRef = ref }
        fixedHeader
        onScroll={ this.scrollListener }>
        <Header
          onClick={ this.onHeaderClick }
          title={ <span>{ config.siteTitle }</span> }>
          <Navigation>
            <a
              className={ 'github-link' }
              target={ '_blank' }
              href={ config.projectLink }><img src={ require('../images/GitHub-Mark-Light-32px.png') } /></a>
          </Navigation>
        </Header>
        <Drawer title={ 'タグ' }>
          <Navigation>
            { this.renderKeywords() }
          </Navigation>
        </Drawer>
        <Content>
          <div
            ref={ (ref) => this.rootRef = ref }
            style={ { margin: '0 auto' } }>
            <List
              items={ this.state.items }
              onImageClick={ this.onImageClick }
              onFavouriteClick={ this.onFavouriteClick } />
            <Loading isHidden={ !this.state.isLoading } />
            <Message
              ref={ (ref) => this.errorRef = ref }
              text={ '読み込みに失敗しました' }
              isHidden />
            <Refresh onClick={ async () => await this.reRenderContent(true) } />
            <Account onClick={ () => this.loginRef.open() } />
            <Image
              ref={ (ref) => this.imageRef = ref }
              images={ this.state.images } />
            <LoginContainer ref={ (ref) => this.loginRef = ref } />
            <Alert ref={ (ref) => this.alertRef = ref } />
          </div>
        </Content>
      </Layout>
      );
  }
}
