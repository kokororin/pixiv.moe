import hashStr from './hashStr';

test('hashStr of `kotori` should be -1125571242', () => {
  expect(hashStr('kotori')).toEqual(-1125571242);
});
