import { IPagination } from '../../helpers';

export const LOAD_POSTS_PAGING_REQUEST = 'LOAD_POSTS_PAGING_REQUEST';
export const LOAD_POSTS_PAGING_SUCCESS = 'LOAD_POSTS_PAGING_SUCCESS';
export const LOAD_POSTS_PAGING_FAILURE = 'LOAD_POSTS_PAGING_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const GET_POST_BY_ID_REQUEST = 'GET_POST_BY_ID_REQUEST';
export const GET_POST_BY_ID_SUCCESS = 'GET_POST_BY_ID_SUCCESS';
export const GET_POST_BY_ID_FAILURE = 'GET_POST_BY_ID_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const DELETE_POSTS_REQUEST = 'DELETE_POSTS_REQUEST';
export const DELETE_POSTS_SUCCESS = 'DELETE_POSTS_SUCCESS';
export const DELETE_POSTS_FAILURE = 'DELETE_POSTS_FAILURE';

export interface IPost {
  _id: string;
  user: string;
  title: string;
  subtitle: string;
  urlimg: string;
  text: string;
  date: Date;
}

export interface IAddPostRequest {
  title: string;
  subtitle: string;
  urlimg: string;
  text: string;
}

export interface IUpdatePostRequest {
  title: string;
  subtitle: string;
  urlimg: string;
  text: string;
}
interface LoadPostsPagingRequest {
  type: typeof LOAD_POSTS_PAGING_REQUEST;
}

interface LoadPostsPagingSuccess {
  type: typeof LOAD_POSTS_PAGING_SUCCESS;
  payload: IPagination<IPost>;
}

interface LoadPostsPagingFailure {
  type: typeof LOAD_POSTS_PAGING_FAILURE;
  payload: {
    error: string;
  };
}

interface AddPostRequest {
  type: typeof ADD_POST_REQUEST;
}

interface AddPostSuccess {
  type: typeof ADD_POST_SUCCESS;
}

interface AddPostFailure {
  type: typeof ADD_POST_FAILURE;
  payload: {
    error: string;
  };
}

interface GetPostByIdRequest {
  type: typeof GET_POST_BY_ID_REQUEST;
}

interface GetPostByIdSuccess {
  type: typeof GET_POST_BY_ID_SUCCESS;
  payload: {
    post: IPost;
  };
}

interface GetPostByIdFailure {
  type: typeof GET_POST_BY_ID_FAILURE;
  payload: {
    error: string;
  };
}

interface UpdatePostRequest {
  type: typeof UPDATE_POST_REQUEST;
}

interface UpdatePostSuccess {
  type: typeof UPDATE_POST_SUCCESS;
}

interface UpdatePostFailure {
  type: typeof UPDATE_POST_FAILURE;
  payload: {
    error: string;
  };
}

interface DeletePostsRequest {
  type: typeof DELETE_POSTS_REQUEST;
}

interface DeletePostsSuccess {
  type: typeof DELETE_POSTS_SUCCESS;
}

interface DeletePostsFailure {
  type: typeof DELETE_POSTS_FAILURE;
  payload: {
    error: string;
  };
}

export interface PostsState {
  items: IPost[];
  page: number;
  total: number;
  pageSize: number;
  loading: boolean;
  deletedCount: number;
  error: string | null;
  editPost: IPost | null;
}

export type PostsActionTypes =
  | LoadPostsPagingRequest
  | LoadPostsPagingSuccess
  | LoadPostsPagingFailure
  | LoadPostsPagingFailure
  | AddPostRequest
  | AddPostSuccess
  | AddPostFailure
  | AddPostFailure
  | GetPostByIdSuccess
  | GetPostByIdRequest
  | GetPostByIdFailure
  | UpdatePostRequest
  | UpdatePostSuccess
  | UpdatePostFailure
  | DeletePostsRequest
  | DeletePostsSuccess
  | DeletePostsFailure;
