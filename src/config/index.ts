interface ILanguage {
  name: string;
  value: string;
  messages: any;
}

export default {
  apiBaseURL: process.env.PIXIV_API_ENTRY
    ? process.env.PIXIV_API_ENTRY
    : 'https://api.pixiv.moe',
  socketURL: process.env.PIXIV_API_ENTRY
    ? process.env.PIXIV_API_ENTRY
    : 'https://api.pixiv.moe',
  trackingID: 'UA-70944432-2',
  projectLink: 'https://github.com/kokororin/pixiv.moe',
  translateLink: 'https://github.com/kokororin/pixiv.moe#localization',
  siteTitle: 'pixivギャラリー',
  languages: [] as ILanguage[]
};
