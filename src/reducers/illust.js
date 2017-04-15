import { IllustActions } from '@/actions';

export default function illust(state = {
    item: {
      title: ''
    },
    isFetching: true,
    isError: false
  } , action) {
  switch (action.type) {
    case IllustActions.SET_ITEM:
      return {
        ...state,
        item: action.payload.data
      };

    case IllustActions.SET_FETCH_ERROR:
      return {
        ...state,
        isError: action.payload.isError
      };

    case IllustActions.SET_FETCH_STATUS:
      return {
        ...state,
        isFetchCompleted: action.payload.isFetchCompleted
      };

    case IllustActions.CLEAR_ITEM:
      return {
        ...state,
        item: action.payload.item
      };

    default:
      return state;
  }
}
