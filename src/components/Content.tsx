import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import scrollTo from '@/utils/scrollTo';

const useStyles = makeStyles({
  container: {
    width: '100%',
    position: 'relative',
    display: 'inline-block',
    overflowY: 'auto',
    overflowX: 'hidden',
    flexGrow: 1,
    zIndex: 1,
    WebkitOverflowScrolling: 'touch'
  }
});

interface IContentProps {
  children: JSX.Element;
}

interface IContent
  extends React.ForwardRefExoticComponent<
    IContentProps & React.RefAttributes<IContentHandles>
  > {
  getElement: () => Element | null;
}

export interface IContentHandles {
  toTop: () => void;
}

const Content = React.forwardRef<IContentHandles, IContentProps>(
  (props, ref) => {
    const classes = useStyles();
    const containerRef = React.createRef<HTMLDivElement>();

    Content.getElement = () => document.querySelector(`.${classes.container}`);

    React.useImperativeHandle(ref, () => ({
      toTop: () => {
        if (containerRef.current) {
          scrollTo(containerRef.current, 0, 900, 'easeInOutQuint');
        }
      }
    }));
    return (
      <div ref={containerRef} className={classes.container}>
        {props.children}
      </div>
    );
  }
) as IContent;

export default Content;
