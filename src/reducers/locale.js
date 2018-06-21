import * as LocaleActions from '@/actions/locale';

const types = LocaleActions.types;

export default function locale(
  state = {
    lang: '',
    messages: {}
  },
  action
) {
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
