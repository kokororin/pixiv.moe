import { EmojiParser } from '@/utils';

describe('EmojiParser', () => {
  it('should parse out with a <img />', () => {
    expect(EmojiParser.parse('すべてのコマがかわいい(love2)')).to.equal(
      'すべてのコマがかわいい<img class="emoji-text" src="https://source.pixiv.net/common/images/emoji/203.png" />'
    );
  });
});
