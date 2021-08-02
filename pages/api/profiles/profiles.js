import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const profilesAPI = {
  getProfiles,
  updataProfile,
};

function getProfiles() {
  return axios.get("http://18.216.251.104:5000/api/customer/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function updataProfile(body) {
  return axios.post("http://18.216.251.104:5000/api/customer/update",body,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}