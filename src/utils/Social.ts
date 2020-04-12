export default class Social {
  url: string;
  text: string;

  constructor(options: { url: string; text: string }) {
    this.url = options.url;
    this.text = options.text;
  }

  openLink(url: string) {
    window.open(url, '_blank', 'width=550,height=370');
  }

  toTwitter() {
    this.openLink(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        this.text
      )}&url=${encodeURIComponent(this.url)}`
    );
  }

  toLine() {
    this.openLink(
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        this.url
      )}`
    );
  }

  toWeibo() {
    this.openLink(
      `http://service.weibo.com/share/share.php?url=${encodeURIComponent(
        this.url
      )}&title=${encodeURIComponent(this.text)}`
    );
  }
}
