import axios from "axios";
import Cookies from "js-cookie";

export const saveAPI = {
  getLovePlace,
  getUnLove,
};

const token = Cookies.get("token");

function getLovePlace() {
  return axios.get("http://18.216.251.104:5000/api/customer/getloveplace", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getUnLove(id){
  return axios.get("http://18.216.251.104:5000/api/customer/unlove/"+id,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
