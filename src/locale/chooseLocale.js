import { addLocaleData } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import ja from '@/locale/ja';

const chooseLocale = language => {
  switch (language.split('_')[0]) {
    // case 'zh':
    // return 'zh_CN';
    default:
      addLocaleData(jaLocaleData);
      return { lang: 'ja', message: ja };
  }
};

export default chooseLocale;
