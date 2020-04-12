import { expect } from 'chai';
import gallery from '@/reducers/gallery';
import { IGalleryAction } from '@/actions/gallery';

describe('GalleryReducer', () => {
  it('should return the initial state', () => {
    expect(gallery(undefined, {} as IGalleryAction)).to.deep.equal({
      page: 1,
      isFetching: false,
      isError: false,
      errorTimes: 0,
      items: [],
      images: [],
      isFetchingTags: false,
      tags: [],
      word: 'ranking',
      fromIllust: false
    });
  });
});
