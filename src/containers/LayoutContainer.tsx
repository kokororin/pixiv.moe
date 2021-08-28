import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
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
  children: React.ReactNode;
}

export interface LayoutContainerHandles {
  toTop: () => void;
  openLogin: () => void;
}

const LayoutContainer = forwardRef<
  LayoutContainerHandles,
  LayoutContainerProps
>((props, ref) => {
  const classes = useStyles();
  const contentRef = useRef<ContentHandles>(null);
  const loginRef = useRef<LoginContainerHandles>(null);

  const onHeaderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    if (
      typeof target.className === 'string' &&
      target.className.indexOf(classes.toolbar) > -1
    ) {
      contentRef?.current?.toTop();
    }
  };

  useImperativeHandle(ref, () => ({
    toTop: () => {
      contentRef?.current?.toTop();
    },
    openLogin: () => {
      loginRef?.current?.open();
    }
  }));

  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
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
