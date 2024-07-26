import axios from './axios';

export const signupRequest = (user) => {
  const res = axios.post(`auth/singup`, user)
  return res;
}

export const loginRequest = (user) => {
  const res = axios.post(`auth/login`, user)
  return res;
}

export const verifyRequest = (token) => {
  const res = axios.post(`auth/verify`, token)
  return res;
}

export const updateRequest = (id, editedUser) => {
  const res = axios.put(`auth/users/${id}`, editedUser)
  return res;
}