import axios from "axios"

export const sportAPI = {
    getSport,
    getSportById,
}

function getSport(){
    return axios.get("http://18.216.251.104:5000/api/customer/getsport")
}

function getSportById(id){
    return axios.get("http://18.216.251.104:5000/api/customer/getSport/"+id);
}