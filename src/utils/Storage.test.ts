import Storage from './Storage';

test('set and get storage should work', () => {
  Storage.set('name', 'value');
  expect(Storage.get('name')).toEqual('value');
});

it('delete storage should work', () => {
  Storage.set('name', 'value');
  Storage.remove('name');
  expect(Storage.get('name')).toEqual(null);
});

it('clear storage should work', () => {
  Storage.set('name', 'value');
  Storage.clear();
  expect(Storage.get('name')).toEqual(null);
});
