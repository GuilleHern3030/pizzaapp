import axios from "./axios.js";
import { setLocalToken } from "./localtoken.js";

const endpoint = "/users";

const getToken = async(user, psw) => {
    try {
        const { data } = await axios.get(endpoint, {
            headers: {
                "user": user,
                "password": psw
            }
        })
        setLocalToken(data.token);
        return data;
    } catch(e) {
        return false;
    }
}

export default getToken;