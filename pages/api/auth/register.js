import axios from "axios";

export const RegisterAPI = {
    postRegister,
}

function postRegister(body) {
    return axios.post("http://18.216.251.104:5000/api/auth/register", body);
}