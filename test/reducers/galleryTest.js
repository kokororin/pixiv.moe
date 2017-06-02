import gallery from '@/reducers/gallery';

describe('GalleryReducer', () => {
  it('should return the initial state', () => {
    expect(gallery(undefined, {})).to.deep.equal({
      page: 1,
      isFetching: false,
      isError: false,
      items: [],
      images: [],
      contentScrollTop: 0
    });
  });
});
