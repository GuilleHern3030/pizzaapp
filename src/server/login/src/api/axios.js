import axios from 'axios';

const instance = axios.create({
  baseURL: API_URL,
});

export const apiUrl = API_URL;

export default instance;