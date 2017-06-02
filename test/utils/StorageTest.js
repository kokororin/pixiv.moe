import { Storage } from '@/utils';

describe('Storage', () => {
  it('set and get storage should work', () => {
    Storage.set('name', 'value');
    expect(Storage.get('name')).to.equal('value');
  });

  it('delete storage should work', () => {
    Storage.set('name', 'value');
    Storage.remove('name');
    expect(Storage.get('name')).to.equal(null);
  });

  it('clear storage should work', () => {
    Storage.set('name', 'value');
    Storage.clear();
    expect(Storage.get('name')).to.equal(null);
  });
});
