import '@/styles/Illust.scss';
import '@/styles/Animation.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-component';
import {
  Layout,
  Header,
  Content,
  Icon,
  Chip,
  ChipContact,
  Button,
  List
} from 'react-mdl';
import shortid from 'shortid';
import time from 'locutus/php/datetime/time';
import Img from 'react-image';

import config from '@/config';

import { IllustActions } from '@/actions';
import { Alert, Comment, Loading, Message } from '@/components';
import { LoginContainer } from '@/containers';
import { cachedFetch, EmojiParser, moment, Storage } from '@/utils';

@autobind
export class IllustContainerWithoutStore extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.layoutDOMNode = ReactDOM.findDOMNode(this.layoutRef);
    this.illustId = this.props._[0];
    this.props.dispatch(IllustActions.fetchItem(this.illustId));
    this.props.dispatch(IllustActions.fetchComments(this.illustId));
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
    this.props.dispatch(IllustActions.clearComments());
    clearInterval(this.authTimer);
  }

  componentDidUpdate() {
    const commentListDOMNode = ReactDOM.findDOMNode(this.commentListRef);
    if (commentListDOMNode) {
      const commentContentDOMNodes = commentListDOMNode.querySelectorAll(
        'span.mdl-list__item-sub-title'
      );
      for (const commentContentDOMNode of commentContentDOMNodes) {
        commentContentDOMNode.innerHTML = EmojiParser.parse(
          commentContentDOMNode.innerHTML
        );
      }
    }
  }

  renderHeaderTitle() {
    const child = (
      <Link href={'/'} className={'back-link'}>
        <Icon className={'back-icon'} name={'arrow_back'} />
      </Link>
    );
    return <span>{child} <span>{this.props.illust.item.title}</span></span>;
  }

  onFavouriteClick(event) {
    const authData = Storage.get('auth');
    if (authData === null || authData.expires_at < time()) {
      return this.loginRef.open();
    }
    const target = event.nativeEvent.target, body = document.body;
    if (target.classList.contains('fn-wait')) {
      return;
    }
    target.classList.add('fn-wait');
    body.classList.add('fn-wait');
    cachedFetch(`${config.apiBaseURL}${config.favouriteURI}/${this.illustId}`, {
      mode: 'cors',
      method: 'put',
      timeout: 10e3,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Token': authData.access_token
      }
    })
      .then(data => {
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
    tempLink.href = this.props.illust.item.image_urls.large;
    tempLink.setAttribute('download', `${this.props.illust.item.title}.jpg`);
    tempLink.setAttribute('target', '_blank');
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  onTwitterClick() {
    window.open(
      `https://twitter.com/intent/tweet?original_referer=${encodeURIComponent(window.location.href)}&ref_src=twsrc%5Etfw&text=${encodeURIComponent(`${this.props.illust.item.title} | ${this.props.illust.item.user.name} #pixiv`)}&tw_p=tweetbutton&url=${encodeURIComponent(`${config.baseURL}${this.props.illust.item.id}`)}`,
      '_blank',
      'width=550,height=370'
    );
  }

  scrollListener(event) {
    if (!this.props.illust.isFetchCommentsCompleted) {
      return;
    }
    if (this.props.illust.isCommentsEnd) {
      return;
    }
    const target = event.nativeEvent.target,
      targetHeight = target.clientHeight,
      scrollTop = target.scrollTop,
      scrollHeight = target.scrollHeight;
    if (scrollTop + targetHeight - scrollHeight > -200) {
      this.props.dispatch(IllustActions.fetchComments(this.illustId));
    }
  }

  renderContent() {
    const illust = this.props.illust;
    if (!illust.isFetchCompleted) {
      return <Loading isHidden={false} />;
    }
    if (illust.isError) {
      return <Message isHidden={false} text={'エラーが発生しました'} />;
    }
    try {
      return (
        <div className={'illust'}>
          <div className={'image'}>
            {this.props.illust.item.metadata === null
              ? <Img
                  src={[
                    this.props.illust.item.image_urls.large,
                    this.props.illust.item.image_urls.px_480mw
                  ]}
                  loader={<Loading isHidden={false} />}
                />
              : this.props.illust.item.metadata.pages.map(elem => {
                  return (
                    <Img
                      key={shortid.generate()}
                      src={[elem.image_urls.large, elem.image_urls.px_480mw]}
                      loader={<Loading isHidden={false} />}
                    />
                  );
                })}
          </div>
          <div className={'tags'}>
            {this.props.illust.item.tags.map(elem => {
              return (
                <Chip key={shortid.generate()}>
                  <ChipContact>
                    #
                  </ChipContact>
                  {elem}
                </Chip>
              );
            })}
          </div>
          <div className={'actions'}>
            <Button raised ripple onClick={this.onFavouriteClick}>
              ブックマークに追加
            </Button>
            <Button raised ripple onClick={this.onDownloadClick}>
              ダウンロード
            </Button>
            <Button raised ripple onClick={this.onTwitterClick}>
              ツイート
            </Button>
          </div>
          <div className={'detail'}>
            <div>
              <div className={'author'}>
                <a
                  target={'_blank'}
                  href={`http://pixiv.me/${this.props.illust.item.user.account}`}>
                  {this.props.illust.item.user.name}
                </a>
              </div>
              <time>
                {`${moment(this.props.illust.item.created_time).format('LLL')}(JST)`}
              </time>
            </div>
            <p>
              <a target={'_blank'} href={`/${this.props.illust.item.id}`}>
                pixivにリダイレクトする
              </a>
            </p>
          </div>
          <div className={'comments'} ref={ref => (this.commentListRef = ref)}>
            {this.props.illust.comments.length === 0
              ? <h4>コメントはありません</h4>
              : <h4>コメント</h4>}
            <List style={{ width: 'auto' }}>
              {this.props.illust.comments.map(elem => {
                return <Comment key={shortid.generate()} item={elem} />;
              })}
            </List>
            <Loading isHidden={this.props.illust.isFetchCommentsCompleted} />
          </div>
          <LoginContainer ref={ref => (this.loginRef = ref)} />
          <Alert ref={ref => (this.alertRef = ref)} />
        </div>
      );
    } catch (e) {
      return <Message isHidden={false} text={'エラーが発生しました'} />;
    }
  }

  render() {
    return (
      <Layout
        fixedHeader
        id={'illust-layout'}
        ref={ref => (this.layoutRef = ref)}
        onScroll={this.scrollListener}>
        <Header id={'illust-title'} title={this.renderHeaderTitle()} />
        <Content>
          {this.renderContent()}
        </Content>
      </Layout>
    );
  }
}

export default connect(state => {
  return {
    illust: state.illust
  };
})(IllustContainerWithoutStore);
