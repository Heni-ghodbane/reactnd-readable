const URL = 'http://localhost:5001';

export const fetchCategories = () =>
  fetch(`${URL}/categories`, {
    mode: 'cors',
    headers: {
      accept: 'application/json',
      authorization: 'Winston2017',
    },
  });
