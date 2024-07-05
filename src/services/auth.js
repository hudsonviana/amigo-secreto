import { getToday } from '../utils/getToday.js';

export const validatePassword = (password) => {
  const currentPassword = getToday().split('/').join('');
  return password === currentPassword;
};

export const createToken = () => {
  const currentPassword = getToday().split('/').join('');
  return `${process.env.DEFAULT_TOKEN}${currentPassword}`;
};

export const validateToken = (token) => {
  const currentToken = createToken();
  return token === currentToken;
};
