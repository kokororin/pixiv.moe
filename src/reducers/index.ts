import { combineReducers } from 'redux';

import auth, { IAuthState } from '@/reducers/auth';
import gallery, { IGalleryState } from '@/reducers/gallery';
import illust, { IIllustState } from '@/reducers/illust';
import locale, { ILocaleState } from '@/reducers/locale';

const reducers = combineReducers({
  auth,
  gallery,
  illust,
  locale
});

export interface ICombinedState {
  auth: IAuthState;
  gallery: IGalleryState;
  illust: IIllustState;
  locale: ILocaleState;
}

export default reducers;
