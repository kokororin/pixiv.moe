import styles from '@/styles/Illust.scss';

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import shortid from 'shortid';
import Img from 'react-image';
import DocumentTitle from 'react-document-title';
import { FormattedMessage, injectIntl } from 'react-intl';

import config from '@/config';

import * as IllustActions from '@/actions/illust';
import * as GalleryActions from '@/actions/gallery';
import Alert from '@/components/Alert';
import Comment from '@/components/Comment';
import GifPlayer from '@/components/GifPlayer';
import InfiniteScroll from '@/components/InfiniteScroll';
import Loading from '@/components/Loading';
import Message from '@/components/Message';
import ScrollContext from '@/components/ScrollContext';
import LoginContainer from '@/containers/LoginContainer';
import cachedFetch from '@/utils/cachedFetch';
import moment from '@/utils/moment';
import Storage from '@/utils/Storage';

@connect(state => ({ illust: state.illust }))
@injectIntl
@CSSModules(styles, { allowMultiple: true })
export default class IllustContainer extends React.Component {
  constructor(props) {
    super(props);

    this.illustId = this.props.match.params.illustId;
  }

  componentDidMount() {
    if (!this.item.id) {
      this.props.dispatch(IllustActions.fetchItem(this.illustId));
    }

    this.props.dispatch(IllustActions.fetchComments(this.illustId));
    this.authTimer = setInterval(() => {
      const authData = Storage.get('auth');
      if (authData === null) {
        return;
      }
      if (authData.expires_at < moment().unix()) {
        Storage.remove('auth');
      }
    }, 500);
  }

  componentWillUnmount() {
    this.props.dispatch(IllustActions.clearComments());
    clearInterval(this.authTimer);
  }

  get item() {
    if (!this.props.illust.items[this.illustId]) {
      return {
        title: ''
      };
    }
    return this.props.illust.items[this.illustId];
  }

  @autobind
  onBackClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.history.length > 1) {
      this.props.history.goBack();
    } else {
      this.props.history.push('/');
    }
  }

  @autobind
  onFavouriteClick(event) {
    const authData = Storage.get('auth');
    if (authData === null || authData.expires_at < moment().unix()) {
      return this.loginRef.open();
    }
    const target = event.target,
      body = document.body;
    if (target.classList.contains('fn-wait')) {
      return;
    }
    target.classList.add('fn-wait');
    body.classList.add('fn-wait');
    cachedFetch(`${config.apiBaseURL}${config.favouriteURI}/${this.illustId}`, {
      mode: 'cors',
      method: 'put',
      timeout: 30e3,
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
        this.alertRef.setContent(
          this.props.intl.formatMessage({ id: 'Communication Error Occurred' })
        );
      });
  }

  @autobind
  onDownloadClick() {
    const tempLink = document.createElement('a');
    tempLink.href = this.item.image_urls.large;
    tempLink.setAttribute('download', `${this.item.title}.jpg`);
    tempLink.setAttribute('target', '_blank');
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  @autobind
  onTwitterClick() {
    window.open(
      `https://twitter.com/intent/tweet?original_referer=${encodeURIComponent(
        window.location.href
      )}&ref_src=twsrc%5Etfw&text=${encodeURIComponent(
        `${this.item.title} | ${this.item.user.name} #pixiv`
      )}&tw_p=tweetbutton&url=${encodeURIComponent(
        `${config.baseURL}${this.item.id}`
      )}`,
      '_blank',
      'width=550,height=370'
    );
  }

  @autobind
  onTagClick(tag) {
    this.props.dispatch(GalleryActions.setWord(tag));
    this.props.dispatch(GalleryActions.setFromIllust(true));
    this.props.history.push('/');
  }

  renderImage() {
    if (this.item.metadata === null) {
      return (
        <Img
          src={[this.item.image_urls.large, this.item.image_urls.px_480mw]}
          loader={<Loading isHidden={false} />}
        />
      );
    }

    if (Array.isArray(this.item.metadata.pages)) {
      return this.item.metadata.pages.map(elem => {
        return (
          <Img
            key={shortid.generate()}
            src={[elem.image_urls.large, elem.image_urls.px_480mw]}
            loader={<Loading isHidden={false} />}
          />
        );
      });
    }

    if (Array.isArray(this.item.metadata.zip_images)) {
      return <GifPlayer images={this.item.metadata.zip_images} />;
    }
  }

  renderContent() {
    if (this.props.illust.isFetching) {
      return <Loading isHidden={false} />;
    }
    if (this.props.illust.isError) {
      return (
        <Message
          isHidden={false}
          text={this.props.intl.formatMessage({ id: 'An Error Occurred' })}
        />
      );
    }
    try {
      return (
        <div styleName="illust">
          <div styleName="image">{this.renderImage()}</div>
          <div styleName="caption">
            {typeof this.item.caption === 'string' &&
              this.item.caption
                .replace(/(\r\n|\n\r|\r|\n)/g, '\n')
                .split('\n')
                .map(elem => (
                  <p
                    key={shortid.generate()}
                    dangerouslySetInnerHTML={{
                      __html: elem
                    }}
                  />
                ))}
          </div>
          <div styleName="tags">
            {this.item.tags.map(elem => {
              return (
                <Chip
                  key={shortid.generate()}
                  avatar={<Avatar>#</Avatar>}
                  label={elem}
                  onClick={() => this.onTagClick(elem)}
                  clickable
                />
              );
            })}
          </div>
          <div styleName="actions">
            <Button variant="contained" onClick={this.onFavouriteClick}>
              <FormattedMessage id="Add to Bookmarks" />
            </Button>
            <Button variant="contained" onClick={this.onDownloadClick}>
              <FormattedMessage id="Download" />
            </Button>
            <Button variant="contained" onClick={this.onTwitterClick}>
              <FormattedMessage id="Tweet" />
            </Button>
          </div>
          <div styleName="detail">
            <div>
              <div styleName="author">
                <a
                  target="_blank"
                  href={`http://pixiv.me/${this.item.user.account}`}>
                  {this.item.user.name}
                </a>
              </div>
              <time>
                {`${moment(this.item.created_time).format('LLL')}(JST)`}
              </time>
              <div styleName="metas">
                <span styleName="divide">{`${this.item.width}x${
                  this.item.height
                }`}</span>
                {Array.isArray(this.item.tools) && (
                  <span
                    styleName={classNames({
                      divide:
                        Array.isArray(this.item.tools) &&
                        this.item.tools.length > 0
                    })}>
                    {this.item.tools.join(' / ')}
                  </span>
                )}
              </div>
            </div>
            <p>
              <a target="_blank" href={`/${this.item.id}`}>
                <FormattedMessage id="Redirect to pixiv" />
              </a>
            </p>
          </div>
          <InfiniteScroll
            distance={200}
            onLoadMore={() =>
              this.props.dispatch(IllustActions.fetchComments(this.illustId))
            }
            isLoading={this.props.illust.isFetchingComments}
            hasMore={!this.props.illust.isCommentsEnd}>
            <div styleName="comments">
              <h4>
                <FormattedMessage
                  id={
                    this.props.illust.comments.length === 0
                      ? 'No Comments'
                      : 'Comments'
                  }
                />
              </h4>
              <ul styleName="comment-list">
                {this.props.illust.comments.map(elem => {
                  return <Comment key={shortid.generate()} item={elem} />;
                })}
              </ul>
              <Loading isHidden={!this.props.illust.isFetchingComments} />
            </div>
          </InfiniteScroll>
          <LoginContainer onRef={ref => (this.loginRef = ref)} />
          <Alert ref={ref => (this.alertRef = ref)} />
        </div>
      );
    } catch (e) {
      return (
        <Message
          isHidden={false}
          text={this.props.intl.formatMessage({ id: 'An Error Occurred' })}
        />
      );
    }
  }

  render() {
    return (
      <DocumentTitle
        title={this.item.title === '' ? config.siteTitle : this.item.title}>
        <React.Fragment>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" onClick={this.onBackClick}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                {this.item.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <ScrollContext.Container onScroll={this.scrollListener}>
            {this.renderContent()}
          </ScrollContext.Container>
        </React.Fragment>
      </DocumentTitle>
    );
  }
}
