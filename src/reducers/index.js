import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import gallery from '@/reducers/gallery';
import illust from '@/reducers/illust';

const reducers = combineReducers({
  gallery,
  illust,
  router: routerReducer
});

export default reducers;
