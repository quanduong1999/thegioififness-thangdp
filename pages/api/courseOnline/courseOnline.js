import axios from "axios";
import Cookies from "js-cookie";

export const courseOnlineAPI = {
  getBuyOnline,
};

const token = Cookies.get("token");

function getBuyOnline() {
  return axios.get("http://18.216.251.104:5000/api/customer/getbuyonline", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
