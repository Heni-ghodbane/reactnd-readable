import { SERVER_URL, SERVER_AUTH } from '../constants';

export const fetchCategories = () =>
  fetch(`${SERVER_URL}/categories`, {
    mode: 'cors',
    headers: {
      accept: 'application/json',
      authorization: SERVER_AUTH,
    },
  });
