import axios from "axios";
import Cookies from "js-cookie";

export const placeAPI = {
    getAllPlace,
}

const token = Cookies.get("token");

function getAllPlace(){
    return axios.get("http://18.216.251.104:5000/api/customer/allplace",{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
}