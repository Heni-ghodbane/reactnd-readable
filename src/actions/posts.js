import * as PostsAPI from '../util/postsAPI';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SET_ORDER_BY_POSTS = 'SET_ORDER_BY_POSTS';

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
