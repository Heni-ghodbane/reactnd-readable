import {
  RECEIVE_POSTS,
  SET_ORDER_BY_POSTS,
  RECEIVE_POST,
  DELETED_POST,
  VOTED_ON_POST,
} from '../actions';

const initialState = {
  category: 'All',
  orderBy: 'voteCount',
  data: [],
  currentPost: null,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        category: action.payload.category,
        data: action.payload.posts,
      };
    case SET_ORDER_BY_POSTS:
      return {
        ...state,
        orderBy: action.orderBy,
      };
    case RECEIVE_POST:
      return {
        ...state,
        currentPost: action.post,
      };
    case DELETED_POST:
      return {
        ...state,
        data: state.data.filter(post => post.id !== action.post.id),
      };
    case VOTED_ON_POST:
      return {
        ...state,
        data: state.data.map(
          post => (post.id === action.post.id ? action.post : post),
        ),
      };
    default:
      return state;
  }
};

export default posts;
