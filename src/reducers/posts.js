import {
  RECEIVE_POSTS,
  SET_ORDER_BY_POSTS,
  RECEIVE_POST,
  DELETED_POST,
  VOTED_ON_POST,
  ADDED_POST,
  EDITED_POST,
  RECEIVE_COMMENTS,
  ADDED_COMMENT,
  DELETED_COMMENT,
  RECEIVE_COMMENT,
  VOTED_ON_COMMENT,
  EDITED_COMMENT,
} from '../actions';

const initialState = {
  category: 'all',
  orderBy: 'voteCount',
  data: [],
  currentPost: null,
  comments: [],
  currentComment: null,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        category: action.payload.category,
        currentPost: null,
        data: action.payload.posts,
        comments: [],
        currentComment: null,
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
        comments: [],
        currentComment: null,
      };
    case DELETED_POST:
      return {
        ...state,
        currentPost: null,
        data: state.data.filter(post => post.id !== action.post.id),
        comments: [],
        currentComment: null,
      };
    case VOTED_ON_POST:
      return {
        ...state,
        data: state.data.map(
          post => (post.id === action.post.id ? action.post : post),
        ),
      };
    case ADDED_POST:
      return state;
    case EDITED_POST:
      return state;
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments: action.comments,
        currentComment: null,
      };
    case ADDED_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };
    case DELETED_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.comment.id,
        ),
        currentComment: null,
      };
    case RECEIVE_COMMENT:
      return {
        ...state,
        currentComment: action.comment,
      };
    case VOTED_ON_COMMENT:
      return {
        ...state,
        comments: state.comments.map(
          comment =>
            comment.id === action.comment.id ? action.comment : comment,
        ),
      };
    case EDITED_COMMENT:
      return state;
    default:
      return state;
  }
};

export default posts;
