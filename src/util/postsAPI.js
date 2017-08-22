const URL = 'http://localhost:5001';

export const fetchPostsByCategory = category => {
  let categoriesURL;
  if (category === null) {
    categoriesURL = `${URL}/posts`;
  } else {
    categoriesURL = `${URL}/${category}/posts`;
  }
  return fetch(categoriesURL, {
    mode: 'cors',
    headers: {
      accept: 'application/json',
      authorization: 'Winston2017',
    },
  });
};
