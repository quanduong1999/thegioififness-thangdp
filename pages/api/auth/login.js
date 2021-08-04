import axios from "axios";

export const LoginAPI = {
  postLogin,
};

async function postLogin(body) {
  console.log(body, 1111);
  try {
    let res = await axios.post(
      "http://18.216.251.104:5000/api/auth/login",
      body
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
