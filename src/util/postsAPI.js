import { SERVER_URL, SERVER_AUTH } from '../constants';

export const fetchPostsByCategory = category => {
  let categoriesURL;
  if (category === null) {
    categoriesURL = `${SERVER_URL}/posts`;
  } else {
    categoriesURL = `${SERVER_URL}/${category}/posts`;
  }
  return fetch(categoriesURL, {
    mode: 'cors',
    headers: {
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
  });
};

export const fetchPostById = id => {
  return fetch(`${SERVER_URL}/posts/${id}`, {
    mode: 'cors',
    headers: {
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
  });
};

export const deletePostById = id => {
  return fetch(`${SERVER_URL}/posts/${id}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
  });
};

export const vote = (id, option) => {
  return fetch(`${SERVER_URL}/posts/${id}`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
    body: JSON.stringify(option),
  });
};

export const add = post => {
  return fetch(`${SERVER_URL}/posts`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
    body: JSON.stringify(post),
  });
};

export const edit = ({ id, title, body }) => {
  return fetch(`${SERVER_URL}/posts/${id}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
    body: JSON.stringify({ title, body }),
  });
};

export const fetchComments = id => {
  return fetch(`${SERVER_URL}/posts/${id}/comments`, {
    mode: 'cors',
    headers: {
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
  });
};

export const addComment = comment => {
  return fetch(`${SERVER_URL}/comments`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: SERVER_AUTH,
    },
    body: JSON.stringify(comment),
  });
};

export const deleteComment = id => {
  return fetch(`${SERVER_URL}/comments/${id}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
  });
};

export const fetchComment = id => {
  return fetch(`${SERVER_URL}/comments/${id}`, {
    mode: 'cors',
    headers: {
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
  });
};

export const voteOnComment = (id, option) => {
  return fetch(`${SERVER_URL}/comments/${id}`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
    body: JSON.stringify(option),
  });
};

export const editComment = ({ id, body, timestamp }) => {
  return fetch(`${SERVER_URL}/comments/${id}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
    body: JSON.stringify({ body }),
  });
};
