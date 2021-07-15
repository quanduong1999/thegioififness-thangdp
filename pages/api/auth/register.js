import axios from "axios";

export const RegisterAPI = {
    postRegister,
}

function postRegister(body) {
    return axios.post("http://18.119.40.211:5000/api/auth/register", body);
}