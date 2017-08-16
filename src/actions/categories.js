import * as CategoriesAPI from '../util/categoriesAPI';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const fetchCategories = () => async dispatch => {
  const response = await CategoriesAPI.fetchCategories();
  const { categories } = await response.json();
  dispatch(receiveCategories(categories));
};

export const selectedCategory = selectedCategory => ({
  type: SELECTED_CATEGORY,
  selectedCategory,
});
