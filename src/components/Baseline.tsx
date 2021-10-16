import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  '@global': {
    html: {
      fontFamily:
        // eslint-disable-next-line quotes
        "'Helvetica Neue', 'arial', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif",
      fontSize: 14,
      fontWeight: 400,
      WebkitFontSmoothing: 'antialiased',
      lineHeight: '20px',
      width: '100%',
      height: '100%'
    },
    body: {
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    },
    'html, body, #app': {
      width: '100%',
      height: '100%'
    },
    h1: {
      fontWeight: 400
    },
    h2: {
      margin: '24px 0'
    },
    h3: {
      fontWeight: 400
    },
    h4: {
      fontSize: 24,
      lineHeight: '32px',
      MozOsxFontSmoothing: 'grayscale',
      margin: '24px 0 16px'
    },
    h5: {
      margin: '24px 0 16px'
    },
    h6: {
      fontWeight: 400,
      lineHeight: '24px'
    },
    p: {
      fontSize: 14,
      letterSpacing: 0,
      margin: '0 0 16px'
    },
    a: {
      color: 'rgb(255, 64, 129)',
      fontWeight: 500
    },
    blockquote: {
      position: 'relative',
      fontSize: 24,
      fontWeight: 300,
      fontStyle: 'italic',
      lineHeight: 1.35,
      letterSpacing: '0.08em',
      '&:before': {
        position: 'absolute',
        left: '-0.5em',
        content: '"“"'
      },
      '&:after': {
        content: '"”"',
        marginLeft: '-0.05em'
      }
    },
    mark: {
      backgroundColor: '#f4ff81'
    },
    dt: {
      fontWeight: 700
    },
    address: {
      fontWeight: 400,
      letterSpacing: 0
    },
    ul: {
      fontSize: 14,
      lineHeight: '24px'
    },
    ol: {
      fontSize: 14,
      lineHeight: '24px'
    }
  }
});

const Baseline: React.FC<{}> = props => {
  useStyles();
  return <>{props.children}</>;
};

export default Baseline;
