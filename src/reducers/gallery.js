import { GalleryActions } from '@/actions';

export default function gallery(
  state = {
    page: 1,
    isFetching: false,
    isError: false,
    errorTimes: 0,
    items: [],
    images: []
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

    case GalleryActions.types.SET_ERROR_TIMES:
      return {
        ...state,
        errorTimes: state.errorTimes + 1
      };

    case GalleryActions.types.CLEAR_ERROR_TIMES:
      return {
        ...state,
        errorTimes: 0
      };

    case GalleryActions.types.SET_TAG:
      return {
        ...state,
        tag: action.payload.tag
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
