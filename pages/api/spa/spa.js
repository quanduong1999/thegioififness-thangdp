import axios from "axios"

export const spaAPI = {
    getSpa,
    getSpaById,
}

function getSpa() {
    return axios.get("http://18.216.251.104:5000/api/customer/getspa");
}

function getSpaById(id){
    return axios.get("http://18.216.251.104:5000/api/customer/getSpaById/"+id);
}