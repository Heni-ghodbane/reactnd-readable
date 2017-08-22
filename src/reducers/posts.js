import { RECEIVE_POSTS, SET_ORDER_BY_POSTS } from '../actions';

const initialState = {
  category: 'All',
  orderBy: 'voteCount',
  data: [],
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
    default:
      return state;
  }
};

export default posts;
