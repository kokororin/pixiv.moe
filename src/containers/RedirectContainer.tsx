import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import Message from '@/components/Message';

interface IRedirectContainerRouteInfo {
  illustId: string;
}

interface IRedirectContainerProps
  extends RouteComponentProps<IRedirectContainerRouteInfo> {
  intl: InjectedIntl;
}

interface RedirectContainerState {
  isError: boolean;
}

class RedirectContainer extends React.Component<
  IRedirectContainerProps,
  RedirectContainerState
> {
  constructor(props: IRedirectContainerProps) {
    super(props);

    this.state = {
      isError: false
    };
  }

  componentDidMount() {
    const illustId = this.props.match.params.illustId;
    if (!isNaN(parseFloat(illustId)) && isFinite(Number(illustId))) {
      this.setState({
        isError: false
      });
      new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
        window.location.href = `http://www.pixiv.net/member_illust.php?mode=medium&illust_id=${illustId}`;
      });
    } else {
      this.setState({
        isError: true
      });
    }
  }

  render() {
    return this.state.isError ? (
      <Message />
    ) : (
      <Message
        text={this.props.intl.formatMessage({
          id: 'Redirecting to pixiv.net'
        })}
      />
    );
  }
}

export default injectIntl(RedirectContainer);
