import { IllustActions } from '@/actions';

export default function illust(
  state = {
    item: {
      title: ''
    },
    comments: [],
    page: 1,
    isCommentsEnd: false,
    isFetchCompleted: false,
    isError: false,
    isFetchCommentsCompleted: false,
    isCommentsError: false
  },
  action
) {
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

    case IllustActions.SET_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload.data]
      };

    case IllustActions.SET_COMMENTS_PAGE:
      return {
        ...state,
        page: action.payload.page
      };

    case IllustActions.SET_COMMENTS_END:
      return {
        ...state,
        isCommentsEnd: action.payload.isCommentsEnd
      };

    case IllustActions.SET_FETCH_COMMENTS_ERROR:
      return {
        ...state,
        isCommentsError: action.payload.isError
      };

    case IllustActions.SET_FETCH_COMMENTS_STATUS:
      return {
        ...state,
        isFetchCommentsCompleted: action.payload.isFetchCompleted
      };

    case IllustActions.CLEAR_COMMENTS:
      return {
        ...state,
        comments: action.payload.comments,
        page: action.payload.page,
        isCommentsEnd: action.payload.isCommentsEnd
      };

    default:
      return state;
  }
}
