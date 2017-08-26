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

export const fetchPostById = id => {
  return fetch(`${URL}/posts/${id}`, {
    mode: 'cors',
    headers: {
      accept: 'application/json',
      authorization: 'Winston2017',
    },
  });
};

export const deletePostById = id => {
  return fetch(`${URL}/posts/${id}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: 'Winston2017',
    },
  });
};

export const vote = (id, option) => {
  return fetch(`${URL}/posts/${id}`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      authorization: 'Winston2017',
    },
    body: JSON.stringify(option),
  });
};
