import axios from "axios";
import Cookies from "js-cookie";

export const courseAPI = {
    getAllCourse,
    buyCourse,
}

const token = Cookies.get("token")

function getAllCourse(){
    return axios.get("http://18.216.251.104:5000/api/customer/allcourse",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}


function buyCourse(body){
    return axios.post("http://18.216.251.104:5000/api/customer/buycourse",body,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
}
