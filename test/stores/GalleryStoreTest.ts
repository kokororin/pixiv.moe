import { expect } from 'chai';
import { createStore } from '@/stores/GalleryStore';

describe('stores', () => {
  const store = createStore();
  it('fetch ranking', async () => {
    store.setWord('ranking');
    await store.fetchSource();
    expect(store.items).to.have.lengthOf.at.least(1);
  });
});
