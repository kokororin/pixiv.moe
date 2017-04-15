import { combineReducers } from 'redux';

import gallery from '@/reducers/gallery';
import illust from '@/reducers/illust';

const reducers = combineReducers({
  gallery,
  illust
});

export default reducers;
