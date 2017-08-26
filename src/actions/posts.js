import * as PostsAPI from '../util/postsAPI';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const SET_ORDER_BY_POSTS = 'SET_ORDER_BY_POSTS';
export const DELETED_POST = 'DELETED_POST';
export const VOTED_ON_POST = 'VOTED_ON_POST';

export const receivePosts = (category, posts) => ({
  type: RECEIVE_POSTS,
  payload: {
    category,
    posts,
  },
});

export const fetchPostsByCategory = category => async dispatch => {
  // Pass in null for all categories
  let filterByCategory = null;
  if (category !== 'All') {
    filterByCategory = category.toLowerCase();
  }
  const response = await PostsAPI.fetchPostsByCategory(filterByCategory);
  const posts = await response.json();
  dispatch(receivePosts(category, posts));
};

export const setOrderByPosts = orderBy => ({
  type: SET_ORDER_BY_POSTS,
  orderBy,
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post,
});

const deletedPost = post => ({
  type: DELETED_POST,
  post,
});

const voted = post => ({
  type: VOTED_ON_POST,
  post,
});

export const fetchPostById = id => async dispatch => {
  const response = await PostsAPI.fetchPostById(id);
  const post = await response.json();
  dispatch(receivePost(post));
};

export const deletePostById = id => async dispatch => {
  const response = await PostsAPI.deletePostById(id);
  const post = await response.json();
  dispatch(deletedPost(post));
};

export const voteOnPost = (id, option) => async dispatch => {
  const response = await PostsAPI.vote(id, { option });
  const post = await response.json();
  dispatch(voted(post));
};
