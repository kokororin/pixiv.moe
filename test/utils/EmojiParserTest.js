import { expect } from 'chai';
import EmojiParser from '@/utils/EmojiParser';

describe('EmojiParser', () => {
  it('should parse out with a <img />', () => {
    expect(EmojiParser.parse('すべてのコマがかわいい(love2)')).to.match(
      /(.*)<img(.*)src=(.*)" \/>/
    );
  });
});
