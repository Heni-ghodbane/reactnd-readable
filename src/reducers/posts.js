import { AllCategories } from '../constants';

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
  SET_ORDER_BY_COMMENTS,
  SET_WORKING_POST,
  SET_WORKING_COMMENT,
} from '../actions';

const initialState = {
  category: AllCategories.path,
  orderBy: 'voteCount',
  data: [],
  currentPost: null,
  comments: [],
  currentComment: null,
  commentsOrderBy: 'voteCount',
  workingPost: {
    category: '',
    title: '',
    body: '',
    author: '',
  },
  isEditing: false,
  workingComment: {
    title: '',
    body: '',
    author: '',
  },
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
        isEditing: false,
        workingPost: {
          category: '',
          title: '',
          body: '',
          author: '',
        },
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
      return {
        ...state,
        workingPost: {
          category: '',
          title: '',
          body: '',
          author: '',
        },
      };
    case EDITED_POST:
      return {
        ...state,
        workingPost: {
          category: '',
          title: '',
          body: '',
          author: '',
        },
        isEditing: false,
      };
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
        workingComment: {
          title: '',
          body: '',
          author: '',
        },
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
        isEditing: false,
        workingComment: {
          title: '',
          body: '',
          author: '',
        },
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
      return {
        ...state,
        isEditing: false,
        workingComment: {
          title: '',
          body: '',
          author: '',
        },
      };
    case SET_ORDER_BY_COMMENTS:
      return {
        ...state,
        commentsOrderBy: action.orderBy,
      };
    case SET_WORKING_POST:
      return {
        ...state,
        workingPost: { ...state.workingPost, ...action.post },
        isEditing: true,
      };
    case SET_WORKING_COMMENT:
      return {
        ...state,
        workingComment: { ...state.workingComment, ...action.comment },
        isEditing: true,
      };
    default:
      return state;
  }
};

export default posts;
