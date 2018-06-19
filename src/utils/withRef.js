import React from 'react';
import shortid from 'shortid';

export function refComponentHoc(ChildComponent, refer) {
  return class RefComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    @autobind
    setRef(childComponentInstance) {
      if (refer) {
        refer.ref = childComponentInstance;
      }
      this[ChildComponent.name] = childComponentInstance;
    }

    render() {
      const props = { ...this.props, ref: this.setRef };
      return <ChildComponent {...props} />;
    }
  };
}

export default function withRef(wrappedComponent, ...decorators) {
  const refer = new Proxy(
    { id: '' },
    {
      get(target, key) {
        if (key === 'id') {
          const value = target.id;
          target.id = '';
          return value;
        }
        return target[key];
      },
      set(target, key, value) {
        key = shortid.generate();
        target.id = key;
        target[key] = value;
        return true;
      }
    }
  );

  const refComponent = refComponentHoc(wrappedComponent, refer);
  const ResultComponent = decorators.reduce((prev, next) => {
    return next(prev);
  }, refComponent);

  return class RefComponentWrapper extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      !this._refId && (this._refId = refer.id);
    }

    componentWillUnmount() {
      refer[this._refId] = null;
      this._refId = null;
    }

    @autobind
    getRef() {
      return refer[this._refId];
    }

    render() {
      const props = { ...this.props };
      return <ResultComponent {...props} />;
    }
  };
}
