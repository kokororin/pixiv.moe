import { addLocaleData } from 'react-intl';
import idLocaleData from 'react-intl/locale-data/id';
import id from '@/locale/id';
import jaLocaleData from 'react-intl/locale-data/ja';
import ja from '@/locale/ja';
import enLocaleData from 'react-intl/locale-data/en';
import en from '@/locale/en';
import Storage from '@/utils/Storage';
import * as LocaleActions from '@/actions/locale';

const chooseLocale = (language, dispatch) => {
  const cachedLang = Storage.get('lang');
  let lang;
  let messages;

  if (!cachedLang) {
    lang = language.split('-')[0];
  } else {
    lang = cachedLang;
  }

  switch (lang) {
    case 'en':
      addLocaleData(enLocaleData);
      lang = 'en';
      messages = en;
      break;
	  addLocaleData(idLocaleData);
	  lang = 'id';
	  messages = id;
	  break;
    default:
      addLocaleData(jaLocaleData);
      lang = 'ja';
      messages = ja;
  }

  Storage.set('lang', lang);

  dispatch(
    LocaleActions.setLocale({
      lang,
      messages
    })
  );
};

export default chooseLocale;
