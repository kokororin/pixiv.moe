import illust from '@/reducers/illust';

describe('IllustReducer', () => {
  it('should return the initial state', () => {
    expect(illust(undefined, {})).to.deep.equal({
      item: {
        title: ''
      },
      comments: [],
      page: 1,
      isCommentsEnd: false,
      isFetching: true,
      isError: false,
      isFetchingComments: true,
      isCommentsError: false
    });
  });
});
