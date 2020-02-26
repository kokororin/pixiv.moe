import { combineReducers } from 'redux';

import gallery, { IGalleryState } from '@/reducers/gallery';
import illust, { IIllustState } from '@/reducers/illust';
import locale, { ILocaleState } from '@/reducers/locale';

const reducers = combineReducers({
  gallery,
  illust,
  locale
});

export interface ICombinedState {
  gallery: IGalleryState;
  illust: IIllustState;
  locale: ILocaleState;
}

export default reducers;
