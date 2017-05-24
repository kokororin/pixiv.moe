import '@/styles/Animation.scss';
import React from 'react';
import ReactMixin from 'react-mixin';
import { RouteRenderingMixin, RouterMixin } from 'react-router-component';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const mixin = ReactMixin.decorate;

@mixin(RouteRenderingMixin)
@mixin(RouterMixin)
export default class AnimatedLocations extends React.Component {
  static defaultProps = {
    component: 'div'
  };

  getRoutes(props) {
    return props.children;
  }

  render() {
    // A key MUST be set in order for transitionGroup to work.
    const handler = React.cloneElement(this.renderRouteHandler(), {
      key: this.state.match.path
    });

    // TransitionGroup takes in a `component` property, and so does AnimatedLocations, so we pass through
    return (
      <ReactCSSTransitionGroup {...this.props}>
        {handler}
      </ReactCSSTransitionGroup>
    );
  }
}
