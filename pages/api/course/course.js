import axios from "axios";
import Cookies from "js-cookie";

export const courseAPI = {
  getAllCourse,
  buyCourse,
  getCourseBuy,
};

const token = Cookies.get("token");

async function getAllCourse() {
  try {
    let res = await axios.get(
      "http://18.216.251.104:5000/api/customer/allcourse",
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
      return error.response;
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

async function getCourseBuy() {
  try {
    let res = await axios.get(
      "http://18.216.251.104:5000/api/customer/getCourseBuy",
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

async function buyCourse(body) {
  console.log(body, 1111);
  try {
    let res = await axios.post(
      "http://18.216.251.104:5000/api/customer/buycourse",
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
