interface Language {
  name: string;
  value: string;
  messages: any;
}

export const apiBaseURL = process.env.PIXIV_API_ENTRY
  ? process.env.PIXIV_API_ENTRY
  : 'https://api.pixiv.moe';
export const socketURL = process.env.PIXIV_API_ENTRY
  ? new URL(process.env.PIXIV_API_ENTRY).origin
  : 'https://api.pixiv.moe';
export const trackingID = 'UA-70944432-2';
export const projectLink = 'https://github.com/kokororin/pixiv.moe';
export const translateLink =
  'https://github.com/kokororin/pixiv.moe#localization';
export const siteTitle = 'pixiv萌え';
export const languages: Language[] = [
  {
    name: '日本語',
    value: 'ja',
    messages: require('../locale/ja').default
  },
  {
    name: '简体中文',
    value: 'zh',
    messages: require('../locale/zh').default
  },
  {
    name: 'English',
    value: 'en',
    messages: require('../locale/en').default
  },
  {
    name: 'Bahasa Indonesia',
    value: 'id',
    messages: require('../locale/id').default
  },
  {
    name: '한국어',
    value: 'ko',
    messages: require('../locale/ko').default
  },
  {
    name: 'ภาษาไทย',
    value: 'th',
    messages: require('../locale/th').default
  }
];
