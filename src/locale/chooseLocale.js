import { addLocaleData } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import zhLocaleData from 'react-intl/locale-data/zh';
import ja from '@/locale/ja';
import zh from '@/locale/zh';

const chooseLocale = () => {
  switch (navigator.language) {
    case 'zh-CN':
      addLocaleData(zhLocaleData);
      return { lang: 'zh', message: zh };
    default:
      addLocaleData(jaLocaleData);
      return { lang: 'ja', message: ja };
  }
};

export default chooseLocale;
