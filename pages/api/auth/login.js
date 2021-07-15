import axios from "axios";

export const LoginAPI = {
    postLogin,
}

function postLogin(body) {
    return axios.post("http://18.119.40.211:5000/api/auth/login", body);
}