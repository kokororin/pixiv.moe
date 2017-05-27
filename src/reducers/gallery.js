import { GalleryActions } from '@/actions';

export default function gallery(
  state = {
    page: 1,
    isFetching: false,
    isError: false,
    items: [],
    images: [],
    contentScrollTop: 0
  },
  action
) {
  switch (action.type) {
    case GalleryActions.types.SET_ITEMS:
      return {
        ...state,
        items: [...state.items, ...[action.payload.data]]
      };

    case GalleryActions.types.SET_FETCH_ERROR:
      return {
        ...state,
        isError: action.payload.isError
      };

    case GalleryActions.types.SET_FETCH_STATUS:
      return {
        ...state,
        isFetching: action.payload.isFetching
      };

    case GalleryActions.types.SET_PAGE:
      return {
        ...state,
        page: action.payload.page
      };

    case GalleryActions.types.SET_TAG:
      return {
        ...state,
        tag: action.payload.tag
      };

    case GalleryActions.types.SET_CONTENT_SCROLLTOP:
      return {
        ...state,
        contentScrollTop: action.payload.contentScrollTop
      };

    case GalleryActions.types.CLEAR_SOURCE:
      return {
        ...state,
        items: action.payload.items,
        images: action.payload.images
      };

    default:
      return state;
  }
}
