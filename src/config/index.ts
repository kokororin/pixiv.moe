interface ILanguage {
  name: string;
  value: string;
  messages: any;
}

export default {
  apiBaseURL: 'https://api.kotori.love/pixiv',
  trackingID: 'UA-70944432-2',
  projectLink: 'https://github.com/LoveLiveSunshine/pixiv.moe',
  siteTitle: 'pixivギャラリー',
  languages: [] as ILanguage[]
};
