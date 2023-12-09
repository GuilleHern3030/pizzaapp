import { apiUrl as api } from "../data/server-info.json";
import { basename as base } from "../data/routes.json";
import axios from 'axios';

const instance = axios.create({
  baseURL: api,
});

export const apiUrl = api;
export const basename = base;

export default instance;