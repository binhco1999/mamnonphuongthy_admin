import {
  IAddPostRequest,
  IUpdatePostRequest,
  IPost,
} from '../store/posts/types';
import { IPagination, api } from '../helpers';

const login = async (email: string, password: string) => {
  const body = { email, password };
  return await api.post('/v1/auth', body).then((response) => {
    return response.data;
  });
};

const getCurrentLoginUser = async (): Promise<any> => {
  return await api.get<any>('/v1/auth').then((response) => {
    return response.data;
  });
};

const logout = () => {
  sessionStorage.removeItem('user');
};

const getPostsPaging = async (
  keyword: string,
  currentPage: number
): Promise<IPagination<IPost>> => {
  const res = await api
    .get<IPagination<IPost>>(
      `/v1/posts/paging/${currentPage}?keyword=${keyword}`
    )
    .then((response) => {
      return response.data;
    });
  return res;
};

const addPost = async (post: IAddPostRequest): Promise<any> => {
  const res = await api.post(`/v1/posts`, post).then((response) => {
    return response.data;
  });
  return res;
};

const updatePost = async (
  id: string,
  post: IUpdatePostRequest
): Promise<any> => {
  const res = await api.put(`/v1/posts/${id}`, post).then((response) => {
    return response.data;
  });
  return res;
};

const getPostById = async (id: string): Promise<IPost> => {
  const res = await api.get<IPost>(`/v1/posts/${id}`).then((response) => {
    return response.data;
  });
  return res;
};

const deletePosts = async (ids: string[]): Promise<any> => {
  const res = await api.delete(`/v1/posts`, { data: ids }).then((response) => {
    return response.data;
  });
  return res;
};

export const postService = {
  login,
  logout,
  getCurrentLoginUser,
  getPostsPaging,
  addPost,
  updatePost,
  getPostById,
  deletePosts,
};
