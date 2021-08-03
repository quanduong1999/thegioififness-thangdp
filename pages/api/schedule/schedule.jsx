import axios from "axios";
import Cookies from "js-cookie";

export const scheduleAPI = {
    buyScheduleAPI,
}

const token = Cookies.get("token")

function buyScheduleAPI(body){
    return axios.post("http://18.216.251.104:5000/api/customer/buyschedule",body,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}