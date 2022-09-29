import { Link, useParams } from 'react-router-dom';
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useState,
} from 'react';
import { getPostById, updatePost } from '../../../store/posts/actions';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store';
import { IUpdatePostRequest } from '../../../store/posts/types';
import { UrlConstants } from '../../../constants';
import { validateEmail } from '../../../helpers';

export const EditPost = () => {
  let { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const post = useSelector((state: AppState) => state.posts.editPost);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setFormInputs({
      title: post !== null ? post.title : '',
      subtitle: post !== null ? post.subtitle : '',
      urlimg: post !== null ? post.urlimg : '',
      text: post !== null? post.text:'',
    });
  }, [post]);

  const [formInputs, setFormInputs] = useState({
    title: '',
    subtitle: '',
    urlimg: '',
    text: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { title, subtitle, urlimg, text } = formInputs;

  const loading = useSelector<AppState>((state) => state.posts.loading);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (title && subtitle && urlimg && text) {
      const post: IUpdatePostRequest = {
        title: title,
        subtitle: subtitle,
        urlimg: urlimg,
        text: text,
      };
      dispatch(updatePost(id, post));
    }
  };

  return (
    <Fragment>
      <h1 className='h3 mb-4 text-gray-800'>Cập nhật bài viết</h1>
      <div className='card'>
        <div className='card-header'>Thông tin bài viết</div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Tiêu đề</label>
              <input
                type='text'
                className={
                  'form-control ' +
                  (formSubmitted && (!title)
                    ? 'is-invalid'
                    : '')
                }
                value={title}
                name='title'
                onChange={handleChange}
              />
              {formSubmitted && !title && (
                <div className='invalid-feedback'>Tiêu đề không được bỏ trống</div>
              )}
              
            </div>

            <div className='form-group'>
              <label>Tiêu đề phụ</label>
              <input
                type='text'
                className={
                  'form-control ' +
                  (formSubmitted && !subtitle ? 'is-invalid' : '')
                }
                value={subtitle}
                name='subtitle'
                onChange={handleChange}
              />
              {formSubmitted && !subtitle && (
                <div className='invalid-feedback'>Tiêu đề phụ không được bỏ trống</div>
              )}
            </div>
            <div className='form-group'>
              <label>Đường dẫn hình ảnh</label>
              <input
                type='text'
                className={
                  'form-control ' +
                  (formSubmitted && !urlimg ? 'is-invalid' : '')
                }
                value={urlimg}
                name='urlimg'
                onChange={handleChange}
              />
              {formSubmitted && !urlimg && (
                <div className='invalid-feedback'>Đường dẫn hình ảnh không được bỏ trống</div>
              )}
            </div>
            <div className='form-group'>
              <label>Nội dung</label>
              <input
                type='text'
                className={
                  'form-control ' +
                  (formSubmitted && !text ? 'is-invalid' : '')
                }
                value={text}
                name='text'
                onChange={handleChange}
              />
              {formSubmitted && !text && (
                <div className='invalid-feedback'>Nội dung bài viết không được bỏ trống</div>
              )}
            </div>

            <div className='form-group'>
              <button className='btn btn-primary' type='submit'>
                {loading && (
                  <span className='spinner-border spinner-border-sm mr-1'></span>
                )}
                Lưu
              </button>
              <Link className='btn btn-danger' to={UrlConstants.POSTS_LIST}>
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
