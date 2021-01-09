interface ILanguage {
  name: string;
  value: string;
  messages: any;
}

export default {
  apiBaseURL: 'https://api.pixiv.moe',
  trackingID: 'UA-70944432-2',
  projectLink: 'https://github.com/kokororin/pixiv.moe',
  translateLink: 'https://github.com/kokororin/pixiv.moe#localization',
  siteTitle: 'pixivギャラリー',
  languages: [] as ILanguage[]
};
