import axios from "axios";
import Cookies from "js-cookie";

export const searchAPI = {
  searchDiaDiem,
  getTinh,
  getHuyen,
  getXa,
};

const token = Cookies.get("token");

function searchDiaDiem(value) {
  return axios.get(
    "http://18.216.251.104:5000/api/customer/searchdiadiem/"+value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function getTinh(){
  return axios.get("https://vapi.vnappmob.com/api/province/");
}

function getHuyen(id){
  return axios.get("https://vapi.vnappmob.com/api/province/district/"+id);
}

function getXa(id){
  return axios.get("https://vapi.vnappmob.com/api/province/ward/"+id);
}
