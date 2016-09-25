import ReactDOM from 'react-dom';

const topPosition = (domElem) => {
  if (!domElem) {
    return 0;
  }
  return domElem.offsetTop + topPosition(domElem.offsetParent);
}

export default (component) => {
  const el = ReactDOM.findDOMNode(component);
  const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  return topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight;
}