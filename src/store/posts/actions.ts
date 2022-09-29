import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_POSTS_FAILURE,
  DELETE_POSTS_REQUEST,
  DELETE_POSTS_SUCCESS,
  GET_POST_BY_ID_FAILURE,
  GET_POST_BY_ID_REQUEST,
  GET_POST_BY_ID_SUCCESS,
  IAddPostRequest,
  IUpdatePostRequest,
  LOAD_POSTS_PAGING_FAILURE,
  LOAD_POSTS_PAGING_REQUEST,
  LOAD_POSTS_PAGING_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  PostsActionTypes,
} from './types';
import { AnyAction, Dispatch } from 'redux';
import { alertError, alertSuccess, clearAlert } from '../alert/actions';

import { AlertActionTypes } from './../alert/types';
import { ThunkDispatch } from 'redux-thunk';
import { UrlConstants } from '../../constants';
import { history } from '../../helpers';
import { postService } from '../../services';

export const loadPostsPaging = (keyword: string, currentPage: number) => {
  return async (dispatch: Dispatch<PostsActionTypes>) => {
    try {
      dispatch({
        type: LOAD_POSTS_PAGING_REQUEST,
      });

      const res = await postService.getPostsPaging(keyword, currentPage);

      dispatch({
        type: LOAD_POSTS_PAGING_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: LOAD_POSTS_PAGING_FAILURE,
        payload: { error: 'Lỗi không xác định' },
      });
    }
  };
};

export const addPost = (user: string,post: IAddPostRequest) => {
  return async (dispatch: Dispatch<PostsActionTypes | AlertActionTypes>) => {
    try {
      dispatch({
        type: ADD_POST_REQUEST,
      });

      await postService.addPost(post);

      dispatch({
        type: ADD_POST_SUCCESS,
      });

      dispatch(alertSuccess('Thêm bài viết thành công'));

      history.push(UrlConstants.POSTS_LIST);
    } catch (error) {
      dispatch({
        type: ADD_POST_FAILURE,
        payload: { error: 'Lỗi không xác định' },
      });
      dispatch(alertError('Thêm bài viết thất bại'));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const updatePost = (id: string, post: IUpdatePostRequest) => {
  return async (dispatch: Dispatch<PostsActionTypes | AlertActionTypes>) => {
    try {
      dispatch({
        type: UPDATE_POST_REQUEST,
      });

      await postService.updatePost(id, post);

      dispatch({
        type: UPDATE_POST_SUCCESS,
      });

      dispatch(alertSuccess('Cập nhật bài viết thành công'));

      history.push(UrlConstants.POSTS_LIST);
    } catch (error) {
      dispatch({
        type: UPDATE_POST_FAILURE,
        payload: { error: 'Lỗi không xác định' },
      });
      dispatch(alertError('Cập nhật bài viết thất bại'));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const getPostById = (id: string) => {
  return async (dispatch: Dispatch<PostsActionTypes>) => {
    try {
      dispatch({
        type: GET_POST_BY_ID_REQUEST,
      });

      const res = await postService.getPostById(id);

      dispatch({
        type: GET_POST_BY_ID_SUCCESS,
        payload: {
          post: res,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_POST_BY_ID_FAILURE,
        payload: { error: 'Lỗi không xác định' },
      });
    }
  };
};

export const deletePosts = (postIds: string[]) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      dispatch({
        type: DELETE_POSTS_REQUEST,
      });

      await postService.deletePosts(postIds);

      dispatch({
        type: DELETE_POSTS_SUCCESS,
      });
      dispatch(loadPostsPaging('', 1));
    } catch (error) {
      dispatch({
        type: DELETE_POSTS_FAILURE,
        payload: { error: 'Lỗi không xác định' },
      });
    }
  };
};
