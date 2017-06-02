import { moment } from '@/utils';

describe('moment', () => {
  it('convert YYYY-MM-DD H:i:s to JST', () => {
    expect(moment('2017-05-20 00:00:01').format('LLL')).to.equal(
      '2017年5月20日 00:00'
    );
  });
});
