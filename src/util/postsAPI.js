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

export const add = post => {
  return fetch(`${URL}/posts`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      authorization: 'Winston2017',
    },
    body: JSON.stringify(post),
  });
};

export const edit = ({ id, title, body }) => {
  return fetch(`${URL}/posts/${id}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      authorization: 'Winston2017',
    },
    body: JSON.stringify({ title, body }),
  });
};

export const fetchComments = id => {
  return fetch(`${URL}/posts/${id}/comments`, {
    mode: 'cors',
    headers: {
      accept: 'application/json',
      authorization: 'Winston2017',
    },
  });
};

export const addComment = comment => {
  return fetch(`${URL}/comments`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Winston2017',
    },
    body: JSON.stringify(comment),
  });
};

export const deleteComment = id => {
  return fetch(`${URL}/comments/${id}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: 'Winston2017',
    },
  });
};

export const fetchComment = id => {
  return fetch(`${URL}/comments/${id}`, {
    mode: 'cors',
    headers: {
      accept: 'application/json',
      authorization: 'Winston2017',
    },
  });
};

export const voteOnComment = (id, option) => {
  return fetch(`${URL}/comments/${id}`, {
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

export const editComment = ({ id, body, timestamp }) => {
  return fetch(`${URL}/comments/${id}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      authorization: 'Winston2017',
    },
    body: JSON.stringify({ body }),
  });
};
