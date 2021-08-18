import axios from "axios";
import Cookies from "js-cookie";

export const placeAPI = {
  getAllPlace,
  lovePlace,
  getPlaceById,
  getPlaceStarById,
};

const token = Cookies.get("token");

async function getAllPlace() {
  try {
    let res = await axios.get(
      "http://18.216.251.104:5000/api/customer/allplace"
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

async function lovePlace(body) {
  try {
    let res = await axios.post(
      "http://18.216.251.104:5000/api/customer/lovePlace",
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

async function getPlaceById(id) {
  try {
    let res = await axios.get(
      "http://18.216.251.104:5000/api/customer/getplacebyid/" + id
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

async function getPlaceStarById(id) {
  try {
    let res = await axios.get(
      "http://18.216.251.104:5000/api/customer/getplacestarbyid/" + id
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
