import Storage from '../utils/Storage';
import config from '../config';

config.languages = [
  {
    name: '日本語',
    value: 'ja',
    messages: require('./ja').default
  },
  {
    name: '简体中文',
    value: 'zh',
    messages: require('./zh').default
  },
  {
    name: 'English',
    value: 'en',
    messages: require('./en').default
  },
  {
    name: 'Bahasa Indonesia',
    value: 'id',
    messages: require('./id').default
  },
  {
    name: '한국어',
    value: 'ko',
    messages: require('./ko').default
  },
  {
    name: 'ภาษาไทย',
    value: 'th',
    messages: require('./th').default
  }
];

const chooseLocale = (
  language: string,
  setLocaleFunc?: (data: { lang: string; messages: any }) => void
) => {
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

  const messages = found.messages;

  Storage.set('lang', isFallback ? 'ja' : lang);

  const settedLocale = {
    lang: isFallback ? 'ja' : lang,
    messages
  };

  if (setLocaleFunc) {
    setLocaleFunc(settedLocale);
  }

  return settedLocale;
};

export default chooseLocale;
