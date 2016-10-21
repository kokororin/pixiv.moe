import React from 'react';
import { Layout, Header, Navigation, Drawer, Content, Icon } from 'react-mdl';

import config from 'config';

import { Alert, Account, Image, List, Loading, Refresh, Message } from '../components';
import { LoginContainer } from '../containers';
import { Storage } from '../utils';


export default class MainContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentPage: 0,
      currentTag: 'lovelive',
      isFirstLoadCompleted: false,
      lastId: 0,
      newCount: 0,
      items: [],
      images: []
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener.bind(this));

    this.fetchSource(true);
    this.resizeListener();
  // setInterval(this.updateLatent.bind(this), 10e3);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener.bind(this));
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

  onRefreshClick() {
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
    return new Promise((resolve, reject) => {
      if (this.state.isLoading) {
        return;
      }
      this.loading.show();
      this.error.hide();
      this.setState({
        isLoading: true
      });
      let currentPage = isFirstLoad ? 0 : this.state.currentPage;
      fetch(`${config.sourceURL}?sort=popular&tag=${this.state.currentTag}&page=${++currentPage}`, {
        mode: 'cors',
        timeout: 15e3
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          this.loading.hide();
          this.error.show();
        })
        .then((data) => {
          if (data.status == 'success' && data.count > 0) {
            Object.keys(data.response).map((key) => {
              const elem = data.response[key];
              if (isFirstLoad && key == 0) {
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
            this.error.show();
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
        .then(() => {
          resolve();
          this.loading.hide();
        })
        .catch((e) => {
          this.loading.hide();
          this.error.show();
          reject(e);
        });
    });

  }

  resizeListener() {
    /* reset size of masonry-container when window size change */
    const node = this.root,
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
  /* updateLatent() {
     if (this.state.isFirstLoadCompleted && this.state.lastId != 0) {
       fetch(`${config.sourceURL}?last=${this.state.lastId}&t=${+new Date()}`, {
         mode: 'cors'
       })
         .then((response) => {
           if (response.ok) {
             return response.json();
           }
         })
         .then((data) => {
           if (data.status == 'success' && data.new_latent_count) {
             const count = data.new_latent_count;
             if (count > 0) {
               setTimeout(() => {
                 for (const key in data.response) {
                   const elem = data.response[key];
                   if (key == count) {
                     break;
                   }
                   if (key == 0) {
                     this.setState({
                       lastId: elem.id
                     });
                   }
                   this.setState({
                     newCount: this.state.newCount + 1
                   });
                 }

                 window.document.title = `(${this.state.newCount}) ${config.siteTitle}`;
               }, 1500);
             }
           }
         });
     }
   }*/

  onImageClick(index) {
    this.image.openLightbox(index);
  }

  onFavouriteClick(illustId) {
    const authData = Storage.get('auth');
    if (authData == null || authData.expires_time < new Date().getTime()) {
      return this.login.open();
    }
    fetch(config.favouriteURL, {
      mode: 'cors',
      method: 'post',
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
        this.alert.setContent(data.message);
      });
  }

  onKeywordClick(event) {
    event.nativeEvent.preventDefault();
    try {
      document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
    } catch ( e ) {
      document.getElementsByClassName('mdl-layout')[0].MaterialLayout.toggleDrawer();
    }

    this.setState({
      currentTag: event.nativeEvent.target.dataset.tag
    }, () => {
      this.onRefreshClick();
    });
  }

  renderKeywords() {
    const keywords = config.keywords;
    return keywords.map((elem, index) => {
      return <a
               key={ index }
               href={ '#' }
               style={ { fontWeight: elem.en == this.state.currentTag ? 'bold' : 'normal' } }
               data-tag={ elem.en }
               onClick={ this.onKeywordClick.bind(this) }>
               { elem.jp }
             </a>;
    });
  }

  render() {
    return (
      <Layout
        fixedHeader
        onScroll={ this.scrollListener.bind(this) }>
        <Header title={ <span>{ config.siteTitle }</span> }>
          <Navigation>
            <a
              target={ '_blank' }
              href={ config.projectLink }>
              <Icon name={ 'link' } /> GitHub</a>
          </Navigation>
        </Header>
        <Drawer title={ 'タグ' }>
          <Navigation>
            { this.renderKeywords() }
          </Navigation>
        </Drawer>
        <Content>
          <div
            ref={ (ref) => this.root = ref }
            style={ { margin: '0 auto' } }>
            <List
              items={ this.state.items }
              onImageClick={ this.onImageClick.bind(this) }
              onFavouriteClick={ this.onFavouriteClick.bind(this) } />
            <Loading ref={ (ref) => this.loading = ref } />
            <Message
              ref={ (ref) => this.error = ref }
              text={ '読み込みに失敗しました' }
              isHidden={ true } />
            <Refresh
              ref={ (ref) => this.refresh = ref }
              onClick={ this.onRefreshClick.bind(this) } />
            <Account onClick={ () => this.login.open() } />
            <Image
              ref={ (ref) => this.image = ref }
              images={ this.state.images } />
            <LoginContainer ref={ (ref) => this.login = ref } />
            <Alert ref={ (ref) => this.alert = ref } />
          </div>
        </Content>
      </Layout>
      );
  }
}
