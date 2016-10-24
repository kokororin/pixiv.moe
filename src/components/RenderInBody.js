// http://jamesknelson.com/rendering-react-components-to-the-document-body/
import React from 'react';
import ReactDOM from 'react-dom';

export default class RenderInBody extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.popup = document.createElement('div');
    document.body.appendChild(this.popup);
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.popup);
    document.body.removeChild(this.popup);
  }


  renderLayer() {
    ReactDOM.render(this.props.children, this.popup);
  }


  render() {
    // Render a placeholder
    return React.DOM.div(this.props);
  }

}
