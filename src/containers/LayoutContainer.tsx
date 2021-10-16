import React, {
  useRef,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react';
import { useLocation } from 'react-router-dom';
import { useTitle, useMount, useUnmount } from 'ahooks';
import makeStyles from '@mui/styles/makeStyles';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Content, { ContentHandles } from '../components/Content';
import LanguageSelector from '../components/LanguageSelector';
import LoginContainer, {
  LoginContainerHandles,
  UserButton
} from '../containers/LoginContainer';

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
  }
});

interface LayoutContainerProps {
  title: string;
  menuRender: () => React.ReactNode;
  extraRender?: () => React.ReactNode;
  scroll?: {
    infinite: boolean;
    distance: number;
    onLoadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
  };
  children: React.ReactNode;
}

export interface LayoutContainerHandles {
  toTop: () => void;
  openLogin: () => void;
  getContentContainer: () => Element | null | undefined;
}

const LayoutContainer = forwardRef<
  LayoutContainerHandles,
  LayoutContainerProps
>((props, ref) => {
  const classes = useStyles();
  const location = useLocation();
  const contentRef = useRef<ContentHandles>(null);
  const loginRef = useRef<LoginContainerHandles>(null);
  const [ignoreScrollEvents, setIgnoreScrollEvents] = useState(false);

  const onHeaderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    if (
      typeof target.className === 'string' &&
      target.className.indexOf(classes.toolbar) > -1
    ) {
      contentRef?.current?.toTop();
    }
  };

  const cacheKey = useMemo(() => {
    return `'@@SCROLL/'${location.pathname}`;
  }, [location.pathname]);

  const onScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;

    if (!ignoreScrollEvents) {
      sessionStorage.setItem(cacheKey, String(scrollTop));
    }
    setIgnoreScrollEvents(false);

    if (!props.scroll?.infinite) {
      return;
    }

    if (props.scroll?.isLoading) {
      return;
    }

    if (!props.scroll?.hasMore) {
      return;
    }

    const targetHeight = target.clientHeight;
    // const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;

    if (scrollTop + targetHeight - scrollHeight > -1 * props.scroll?.distance) {
      props.scroll?.onLoadMore();
    }
  };

  useMount(() => {
    const scrollTop = sessionStorage.getItem(cacheKey);

    const scrollingElement = contentRef?.current?.getContainer();
    if (scrollTop && scrollingElement) {
      const oldScrollTop = scrollingElement.scrollTop;

      setTimeout(() => {
        scrollingElement.scrollTop = Number(scrollTop);
      }, 145);

      if (Number(scrollingElement.scrollTop) !== Number(oldScrollTop)) {
        setIgnoreScrollEvents(true);
      }
    }

    if (scrollingElement) {
      scrollingElement.addEventListener('scroll', onScroll);
    }
  });

  useUnmount(() => {
    const scrollingElement = contentRef?.current?.getContainer();
    if (scrollingElement) {
      scrollingElement.removeEventListener('scroll', onScroll);
    }
  });

  useImperativeHandle(ref, () => ({
    toTop: () => {
      contentRef?.current?.toTop();
    },
    openLogin: () => {
      loginRef?.current?.open();
    },
    getContentContainer: () => {
      return contentRef?.current?.getContainer();
    }
  }));

  useTitle(props.title);

  return (
    <>
      <AppBar position="static" onClick={onHeaderClick}>
        <Toolbar className={classes.toolbar}>
          {props.menuRender()}
          <Typography
            variant="h6"
            color="inherit"
            className={classes.toolbarTitle}>
            {props.title}
          </Typography>
          <div className={classes.toolbarMiddle} />
          {props.extraRender && <>{props.extraRender()}</>}
          <LanguageSelector />
          <UserButton onClick={() => loginRef.current?.open()} />
        </Toolbar>
      </AppBar>

      <Content ref={contentRef}>
        <>{props.children}</>
      </Content>
      <LoginContainer ref={loginRef} />
    </>
  );
});

export default LayoutContainer;
