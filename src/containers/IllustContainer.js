import '../styles/Illust.scss';
import '../styles/Animation.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-component';
import { Layout, Header, Content, Icon, Chip, ChipContact, Button } from 'react-mdl';
import shortid from 'shortid';
import time from 'locutus/php/datetime/time';

import config from 'config';

import { IllustActions } from '../actions';
import { Alert, Loading, Message } from '../components';
import { LoginContainer } from '.';
import { cachedFetch, moment, Storage } from '../utils';

export class IllustContainerWithoutStore extends React.Component {

  constructor(props) {
    super(props);
    this.onFavouriteClick = ::this.onFavouriteClick;
    this.onDownloadClick = ::this.onDownloadClick;
    this.onTwitterClick = ::this.onTwitterClick;
  }

  componentDidMount() {
    this.illustId = this.props._[0];
    this.props.dispatch(IllustActions.fetchItem(this.illustId));
    this.authTimer = setInterval(() => {
      const authData = Storage.get('auth');
      if (authData === null) {
        return;
      }
      if (authData.expires_at < time()) {
        Storage.remove('auth');
      }
    }, 500);
  }

  componentWillUnmount() {
    this.props.dispatch(IllustActions.setFetchStatus(false));
    this.props.dispatch(IllustActions.clearItem());
    clearInterval(this.authTimer);
  }

  renderHeaderTitle() {
    const child = (
    <Link
      href={ '/' }
      className={ 'back-link' }>
    <Icon
      className={ 'back-icon' }
      name={ 'arrow_back' } />
    </Link>
    );
    return (
      <span>{ child } <span>{ this.props.illust.item.title }</span></span>
      );
  }

  onFavouriteClick(event) {
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
      method: 'put',
      timeout: 10e3,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Token': authData.access_token
      },
      body: JSON.stringify({
        illust_id: this.illustId
      })
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

  onDownloadClick() {
    const tempLink = document.createElement('a');
    tempLink.href = this.props.illust.item.image_urls.px_480mw;
    tempLink.setAttribute('download', `${this.props.illust.item.title}.jpg`);
    tempLink.setAttribute('target', '_blank');
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  onTwitterClick() {
    window.open(`https://twitter.com/intent/tweet?original_referer=${encodeURIComponent(window.location.href)}&ref_src=twsrc%5Etfw&text=${encodeURIComponent(`${this.props.illust.item.title} | ${this.props.illust.item.user.name} #pixiv`)}&tw_p=tweetbutton&url=${encodeURIComponent(`${config.baseURL}#/${this.props.illust.item.id}`)}`, '_blank', 'width=550,height=370');
  }

  renderContent() {
    const illust = this.props.illust;
    if (!illust.isFetchCompleted) {
      return (
        <Loading isHidden={ false } />
        );
    }
    if (illust.isError) {
      return (
        <Message
          isHidden={ false }
          text={ 'エラーが発生しました' } />
        );
    }
    // TODO
    try {
      return (
        <div className={ 'illust' }>
          <Link
            className={ 'link' }
            href={ '/' }>
          <div className={ 'image' }>
            <img
              className={ 'animated rollIn' }
              src={ this.props.illust.item.image_urls.px_480mw } />
          </div>
          </Link>
          <div className={ 'tags' }>
            { this.props.illust.item.tags.map((elem) => {
                return (
                  <Chip key={ shortid.generate() }>
                    <ChipContact>
                      #
                    </ChipContact>
                    { elem }
                  </Chip>
                  );
              }) }
          </div>
          <div className={ 'actions' }>
            <Button
              raised
              ripple
              onClick={ this.onFavouriteClick }>
              ブックマークに追加
            </Button>
            <Button
              raised
              ripple
              onClick={ this.onDownloadClick }>
              ダウンロード
            </Button>
            <Button
              raised
              ripple
              onClick={ this.onTwitterClick }>
              ツイート
            </Button>
          </div>
          <div className={ 'detail' }>
            <p>
              <b>插畫師</b>
              <a
                target={ '_blank' }
                href={ `http://pixiv.me/${this.props.illust.item.user.account}` }>
                { this.props.illust.item.user.name }
              </a>
            </p>
            <p>
              <b>時間</b>
              { `${moment(this.props.illust.item.created_time).format('LLL')}(JST)` }
            </p>
            <p>
              <b>リンク</b>
              <a
                target={ '_blank' }
                href={ `/#/${this.props.illust.item.id}` }>pixiv.net</a>
            </p>
          </div>
          <LoginContainer ref={ (ref) => this.loginRef = ref } />
          <Alert ref={ (ref) => this.alertRef = ref } />
        </div>
        );
    } catch ( e ) {
      return (
        <Message
          isHidden={ false }
          text={ 'エラーが発生しました' } />
        );
    }
  }


  render() {
    return (
      <Layout
        fixedHeader
        id={ 'illust-layout' }>
        <Header
          id={ 'illust-title' }
          title={ this.renderHeaderTitle() } />
        <Content>
          { this.renderContent() }
        </Content>
      </Layout>
      );
  }
}

export default connect((state) => {
  return {
    illust: state.illust
  }
})(IllustContainerWithoutStore);
