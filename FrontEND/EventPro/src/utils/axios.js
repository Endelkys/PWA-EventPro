import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    'Authorization': '',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;