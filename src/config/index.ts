interface ILanguage {
  name: string;
  value: string;
  messages: any;
}

export default {
  apiBaseURL: process.env.PIXIV_API_ENTRY
    ? process.env.PIXIV_API_ENTRY
    : process.env.NODE_ENV === 'production'
    ? 'https://api.pixiv.moe'
    : 'http://localhost:3000/pixiv',
  socketURL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.pixiv.moe'
      : 'http://localhost:3000',
  trackingID: 'UA-70944432-2',
  projectLink: 'https://github.com/kokororin/pixiv.moe',
  translateLink: 'https://github.com/kokororin/pixiv.moe#localization',
  siteTitle: 'pixivギャラリー',
  languages: [] as ILanguage[]
};
