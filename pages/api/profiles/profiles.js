import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const profilesAPI = {
  getProfiles,
};

function getProfiles() {
  return axios.get("http://18.216.251.104:5000/api/customer/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
