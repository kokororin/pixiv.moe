import { combineReducers } from 'redux';

import gallery from './gallery';
import illust from './illust';

const reducers = combineReducers({
  gallery,
  illust
});

export default reducers;
