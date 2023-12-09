import axios from "./axios.js";
import { getLocalToken } from "./localtoken.js";

const endpoint = "/messages";

export const postMessage = async(post) => {
    const { data } = await axios.post(endpoint, post);
    return data;
}

export const getMessages = async() => {
    const { data } = await axios.get(endpoint)
    return data;
}

export const deleteMessage = async(id, token=undefined) => {
    if (token == undefined) token = getLocalToken()
    const { data } = await axios.delete(endpoint + "/" + id, { headers: { "token": token } })
    return data;
}