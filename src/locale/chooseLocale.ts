import { addLocaleData } from 'react-intl';
import { Dispatch } from 'redux';
import Storage from '@/utils/Storage';
import * as LocaleActions from '@/actions/locale';
import config from '@/config';

config.languages = [
  {
    name: '日本語',
    value: 'ja',
    messages: require('@/locale/ja').default,
    localeData: require('react-intl/locale-data/ja')
  },
  {
    name: 'English',
    value: 'en',
    messages: require('@/locale/en').default,
    localeData: require('react-intl/locale-data/en')
  },
  {
    name: 'Bahasa indonesia',
    value: 'id',
    messages: require('@/locale/id').default,
    localeData: require('react-intl/locale-data/id')
  },
  {
    name: '한국어',
    value: 'ko',
    messages: require('@/locale/ko').default,
    localeData: require('react-intl/locale-data/ko')
  }
];

const chooseLocale = (language: string, dispatch: Dispatch) => {
  const cachedLang = Storage.get('lang');
  let lang;

  if (!cachedLang) {
    lang = language.split('-')[0];
  } else {
    lang = cachedLang;
  }

  let found = config.languages[0];
  let isFallback = true;
  for (const item of config.languages) {
    if (lang === item.value) {
      isFallback = false;
      found = item;
    }
  }

  addLocaleData(found.localeData);
  const messages = found.messages;

  Storage.set('lang', isFallback ? 'en' : lang);

  dispatch(
    LocaleActions.setLocale({
      lang: isFallback ? 'en' : lang,
      messages
    })
  );
};

export default chooseLocale;
