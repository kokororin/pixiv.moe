import EmojiParser from './EmojiParser';

test('should parse out with a <img />', () => {
  expect(EmojiParser.parse('すべてのコマがかわいい(love2)')).toMatch(
    /(.*)<img(.*)src=(.*)" \/>/
  );
});
