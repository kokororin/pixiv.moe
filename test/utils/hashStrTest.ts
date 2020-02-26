import { expect } from 'chai';
import hashStr from '@/utils/hashStr';

describe('hashStr', () => {
  it('hashStr of `kotori` should be -1125571242', () => {
    expect(hashStr('kotori')).to.equal(-1125571242);
  });
});
