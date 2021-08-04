import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const profilesAPI = {
  getProfiles,
  updataProfile,
};

async function getProfiles() {
  try {
    let res = await axios.get(
      "http://18.216.251.104:5000/api/customer/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      return error.response.data;
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
    }
  }
}

async function updataProfile(body) {
  try {
    let res = await axios.post(
      "http://18.216.251.104:5000/api/customer/update",
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      return error.response.data;
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
    }
  }
}
