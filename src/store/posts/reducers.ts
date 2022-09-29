import {
  GET_POST_BY_ID_FAILURE,
  GET_POST_BY_ID_REQUEST,
  GET_POST_BY_ID_SUCCESS,
  LOAD_POSTS_PAGING_FAILURE,
  LOAD_POSTS_PAGING_REQUEST,
  LOAD_POSTS_PAGING_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  PostsActionTypes,
  PostsState,
} from './types';

const initialState: PostsState = {
  items: [],
  page: 1,
  total: 0,
  pageSize: 0,
  loading: false,
  deletedCount: 0,
  error: null,
  editPost: null,
};

const postsReducer = (
  state: PostsState = initialState,
  action: PostsActionTypes
): PostsState => {
  switch (action.type) {
    case LOAD_POSTS_PAGING_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_POSTS_PAGING_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        loading: false,
        error: null,
      };
    }
    case LOAD_POSTS_PAGING_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case GET_POST_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_POST_BY_ID_SUCCESS: {
      return {
        ...state,
        editPost: action.payload.post,
        loading: false,
        error: null,
      };
    }
    case GET_POST_BY_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case UPDATE_POST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case UPDATE_POST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export { postsReducer };
