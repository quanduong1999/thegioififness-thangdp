import axios from "axios";
import Cookies from "js-cookie";

export const detailPlaceAPI = {
    getCourseByPlace,
    getScheduleByPlace,
}

const token = Cookies.get("token");

function getCourseByPlace(id){
    return axios.get("http://18.216.251.104:5000/api/customer/getcoursebyplace/"+id)
}

function getScheduleByPlace(id){
    return axios.get("http://18.216.251.104:5000/api/customer/getschedulebyplace/"+id)
}