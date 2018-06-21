import { combineReducers } from 'redux';

import gallery from '@/reducers/gallery';
import illust from '@/reducers/illust';
import locale from '@/reducers/locale';

const reducers = combineReducers({
  gallery,
  illust,
  locale
});

export default reducers;
