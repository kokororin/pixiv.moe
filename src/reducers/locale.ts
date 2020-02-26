import * as LocaleActions from '@/actions/locale';
import { ILocaleAction } from '@/actions/locale';

const types = LocaleActions.types;

export interface ILocaleState {
  lang: string;
  messages: any;
}

export default function locale(
  state: ILocaleState = {
    lang: '',
    messages: {}
  },
  action: ILocaleAction
): ILocaleState {
  switch (action.type) {
    case types.SET_LOCALE:
      return {
        ...state,
        lang: action.payload.lang,
        messages: action.payload.messages
      };

    default:
      return state;
  }
}
