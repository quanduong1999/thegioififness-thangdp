import axios from "axios";
import Cookies from "js-cookie";

export const onlineAPI = {
  getOnline,
};

const token = Cookies.get("token");

function getOnline() {
  return axios.get("http://18.216.251.104:5000/api/customer/online", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
