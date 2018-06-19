import ja from '@/locale/ja';
import zh from '@/locale/zh';

const chooseLocale = () => {
  switch (navigator.language) {
    case 'zh-CN':
      return { lang: 'zh', message: zh };
    default:
      return { lang: 'ja', message: ja };
  }
};

export default chooseLocale;
