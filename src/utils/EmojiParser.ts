export default class EmojiParser {
  static emojiSeries = [
    {
      id: 101,
      name: 'normal'
    },
    {
      id: 102,
      name: 'surprise'
    },
    {
      id: 103,
      name: 'serious'
    },
    {
      id: 104,
      name: 'heaven'
    },
    {
      id: 105,
      name: 'happy'
    },
    {
      id: 106,
      name: 'excited'
    },
    {
      id: 107,
      name: 'sing'
    },
    {
      id: 108,
      name: 'cry'
    },
    {
      id: 201,
      name: 'normal2'
    },
    {
      id: 202,
      name: 'shame2'
    },
    {
      id: 203,
      name: 'love2'
    },
    {
      id: 204,
      name: 'interesting2'
    },
    {
      id: 205,
      name: 'blush2'
    },
    {
      id: 206,
      name: 'fire2'
    },
    {
      id: 207,
      name: 'angry2'
    },
    {
      id: 208,
      name: 'shine2'
    },
    {
      id: 209,
      name: 'panic2'
    },
    {
      id: 301,
      name: 'normal3'
    },
    {
      id: 302,
      name: 'satisfaction3'
    },
    {
      id: 303,
      name: 'surprise3'
    },
    {
      id: 304,
      name: 'smile3'
    },
    {
      id: 305,
      name: 'shock3'
    },
    {
      id: 306,
      name: 'gaze3'
    },
    {
      id: 307,
      name: 'wink3'
    },
    {
      id: 308,
      name: 'happy3'
    },
    {
      id: 309,
      name: 'excited3'
    },
    {
      id: 310,
      name: 'love3'
    },
    {
      id: 401,
      name: 'normal4'
    },
    {
      id: 402,
      name: 'surprise4'
    },
    {
      id: 403,
      name: 'serious4'
    },
    {
      id: 404,
      name: 'love4'
    },
    {
      id: 405,
      name: 'shine4'
    },
    {
      id: 406,
      name: 'sweat4'
    },
    {
      id: 407,
      name: 'shame4'
    },
    {
      id: 408,
      name: 'sleep4'
    },
    {
      id: 501,
      name: 'heart'
    },
    {
      id: 502,
      name: 'teardrop'
    },
    {
      id: 503,
      name: 'star'
    }
  ];

  static parse(content: string) {
    return content.replace(/(\(.+?\))/g, match => {
      let replaceStr = '';
      for (const series of EmojiParser.emojiSeries) {
        if (match === `(${series.name})`) {
          replaceStr += `<img src="https://source.pixiv.net/common/images/emoji/${series.id}.png" />`;
        }
      }
      return replaceStr === '' ? match : replaceStr;
    });
  }
}
