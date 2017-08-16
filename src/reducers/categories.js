import { RECEIVE_CATEGORIES, SELECTED_CATEGORY } from '../actions';

const initialState = {
  categories: {
    selectedCategory: 'All',
    data: [],
  },
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        data: [...action.categories],
      };
    case SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.selectedCategory,
      };
    default:
      return state;
  }
};

export default categories;
