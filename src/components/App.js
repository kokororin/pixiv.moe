import '../styles/Base.css';
import '../styles/App.css';
import '../styles/Button.css';
import '../styles/MaterialIcons.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Masonry from 'react-masonry-component';
import fetchJsonp from 'fetch-jsonp';

import config from 'config';

import Item from './Item';
import Image from './Image';


class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentPage: 0,
      isFirstLoadCompleted: false,
      lastId: 0,
      originalTitle: 'Pixivのラブライブ発見',
      newCount: 0,
      items: [],
      images: [],
      isRefreshIconHidden: false,
      isRefreshSpinnerHidden: true
    };
  }

  componentDidMount() {
    this.fetchSource(true);
    window.addEventListener('scroll', this.scrollListener.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener.bind(this));
  }

  scrollListener(event) {
    if (this.state.isLoading) {
      return;
    }
    const el = ReactDOM.findDOMNode(this);
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (this.topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < 250) {
      this.fetchSource(false);
    }

  }

  topPosition(domElem) {
    if (!domElem) {
      return 0;
    }
    return domElem.offsetTop + this.topPosition(domElem.offsetParent);
  }

  onRefreshClick() {
    this.setState({
      items: [],
      images: [],
      isRefreshIconHidden: true,
      isRefreshSpinnerHidden: false
    });

    this.fetchSource(true, () => {
      this.setState({
        isRefreshIconHidden: false,
        isRefreshSpinnerHidden: true
      });
    });
  }

  fetchSource(isFirstLoad, callback = null) {
    if (this.state.isLoading) {
      return;
    }
    this.setState({
      isLoading: true
    });
    let currentPage = isFirstLoad ? 0 : this.state.currentPage;
    fetchJsonp(config.sourceURL + '?page=' + (++currentPage), {
      method: 'get',
      timeout: 15e3
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.status == 'success' && data.count > 0) {
          Object.keys(data.response).map((key) => {
            const elem = data.response[key];
            this.setState({
              items: this.state.items.concat(elem),
              images: this.state.images.concat({
                uri: elem.image_urls.px_480mw,
                title: elem.title
              })
            });
          });
        } else {
          this.setState({
            isFailureHidden: false
          });
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
        typeof callback === 'function' && callback();
      })
      .catch((ex) => {
        console.log('parsing failed', ex)
      });
  }

  render() {
    return (
      <div>
        <Masonry
                 className={ 'masonry' }
                 elementType={ 'div' }
                 options={ { transitionDuration: 0 } }
                 disableImagesLoaded={ false }
                 updateOnEachImageLoad={ false }>
          { this.state.items.map((elem, index) => {
              return <Item
                           key={ index }
                           item={ elem }
                           onClick={ () => this.image.openLightbox(index) } />
            }) }
        </Masonry>
        <div
             id={ 'refresh' }
             className={ 'float-btn' }
             onClick={ this.onRefreshClick.bind(this) }>
          <i className={ 'material-icons ' + (this.state.isRefreshIconHidden ? 'hide' : 'show') }>replay</i>
          <div className={ 'loading-spinner ' + (this.state.isRefreshSpinnerHidden ? 'hide' : 'show') }></div>
        </div>
        <Image
               ref={ (ref) => this.image = ref }
               images={ this.state.images } />
      </div>
      );
  }
}

export default AppComponent;
