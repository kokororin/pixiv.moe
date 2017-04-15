import { GalleryActions } from '@/actions';

export default function gallery(state = {
    page: 1,
    isFetching: false,
    isError: false,
    items: [],
    images: [],
    contentScrollTop: 0
  } ,action) {
  switch (action.type) {
    case GalleryActions.SET_ITEMS:
      return {
        ...state,
        items: [...state.items, ...[action.payload.data]]
      };

    case GalleryActions.SET_IMAGES:
      return {
        ...state,
        images: [...state.images, ...[action.payload.data]]
      };

    case GalleryActions.SET_FETCH_ERROR:
      return {
        ...state,
        isError: action.payload.isError
      };

    case GalleryActions.SET_FETCH_STATUS:
      return {
        ...state,
        isFetching: action.payload.isFetching
      };

    case GalleryActions.SET_PAGE:
      return {
        ...state,
        page: action.payload.page
      };

    case GalleryActions.SET_TAG:
      return {
        ...state,
        tag: action.payload.tag
      };

    case GalleryActions.SET_CONTENT_SCROLLTOP:
      return {
        ...state,
        contentScrollTop: action.payload.contentScrollTop
      };

    case GalleryActions.CLEAR_SOURCE:
      return {
        ...state,
        items: action.payload.items,
        images: action.payload.images
      };

    default:
      return state;
  }
}
