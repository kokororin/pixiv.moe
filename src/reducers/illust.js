import { IllustActions } from '@/actions';

const types = IllustActions.types;

export default function illust(
  state = {
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
  },
  action
) {
  switch (action.type) {
    case types.SET_ITEM:
      return {
        ...state,
        item: action.payload.data
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

    case types.CLEAR_ITEM:
      return {
        ...state,
        item: action.payload.item
      };

    case types.SET_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload.data]
      };

    case types.SET_COMMENTS_PAGE:
      return {
        ...state,
        page: action.payload.page
      };

    case types.SET_COMMENTS_END:
      return {
        ...state,
        isCommentsEnd: action.payload.isCommentsEnd
      };

    case types.SET_FETCH_COMMENTS_ERROR:
      return {
        ...state,
        isCommentsError: action.payload.isError
      };

    case types.SET_FETCH_COMMENTS_STATUS:
      return {
        ...state,
        isFetchingComments: action.payload.isFetching
      };

    case types.CLEAR_COMMENTS:
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
