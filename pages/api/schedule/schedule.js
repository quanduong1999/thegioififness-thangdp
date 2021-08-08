import axios from "axios";
import Cookies from "js-cookie";

export const scheduleAPI = {
  getAllSchedule,
  buyScheduleAPI,
  getScheduleBuy,
};

const token = Cookies.get("token");

async function getAllSchedule() {
  try {
    let res = await axios.get(
      "http://18.216.251.104:5000/api/customer/allschedule",
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

function buyScheduleAPI(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/customer/buyschedule",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}


async function getScheduleBuy() {
  try {
    let res = await axios.get(
      "http://18.216.251.104:5000/api/customer/getScheduleBuy",
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