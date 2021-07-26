import axios from "axios";

export const LoginAPI = {
    postLogin,
}

function postLogin(body) {
    return axios.post("http://18.216.251.104:5000/api/auth/login", body);
}