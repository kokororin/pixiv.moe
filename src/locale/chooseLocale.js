import { addLocaleData } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import ja from '@/locale/ja';
import enLocaleData from 'react-intl/locale-data/en';
import en from '@/locale/en';
import Storage from '@/utils/Storage';

const chooseLocale = language => {
  const cachedLang = Storage.get('lang');
  let lang;
  let message;

  if (!cachedLang) {
    lang = language.split('-')[0];
  } else {
    lang = cachedLang;
  }

  switch (lang) {
    case 'en':
      addLocaleData(enLocaleData);
      lang = 'en';
      message = en;
      break;
    default:
      addLocaleData(jaLocaleData);
      lang = 'ja';
      message = ja;
  }

  Storage.set('lang', lang);

  return {
    lang,
    message
  };
};

export default chooseLocale;
