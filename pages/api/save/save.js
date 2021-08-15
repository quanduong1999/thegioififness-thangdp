import axios from "axios";
import Cookies from "js-cookie";

export const saveAPI = {
  getLovePlace,
};

const token = Cookies.get("token");

function getLovePlace() {
  return axios.get("http://18.216.251.104:5000/api/customer/getloveplace", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
