import axios from "axios";
import Cookies from "js-cookie";

export const napxuAPI = {
    napXuAPI
}

const token = Cookies.get("token")

function napXuAPI(body){
    return axios.post("http://18.216.251.104:5000/api/customer/napxu",body,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

