import { GalleryActions } from '@/actions';

const types = GalleryActions.types;

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
    case types.SET_ITEMS:
      return {
        ...state,
        items: [...state.items, ...[action.payload.data]]
      };

    case types.SET_FETCH_ERROR:
      return {
        ...state,
        isError: action.payload.isError
      };

    case types.SET_FETCH_STATUS:
      return {
        ...state,
        isFetching: action.payload.isFetching
      };

    case types.SET_PAGE:
      return {
        ...state,
        page: action.payload.page
      };

    case types.SET_ERROR_TIMES:
      return {
        ...state,
        errorTimes: state.errorTimes + 1
      };

    case types.CLEAR_ERROR_TIMES:
      return {
        ...state,
        errorTimes: 0
      };

    case types.SET_TAG:
      return {
        ...state,
        tag: action.payload.tag
      };

    case types.CLEAR_SOURCE:
      return {
        ...state,
        items: action.payload.items,
        images: action.payload.images
      };

    default:
      return state;
  }
}
