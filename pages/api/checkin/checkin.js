import axios from "axios";
import Cookies from "js-cookie";

export const checkInAPI = {
  checkIn,
  checkInOnline,
  checkInSpa,
  checkInSport,
};

const token = Cookies.get("token");

async function checkIn(id,body) {
  try {
    let res = await axios.post(
      "http://18.216.251.104:5000/api/customer/checkin/"+id,
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

function checkInOnline(id,body){
  return axios.get("http://18.216.251.104:5000/api/customer/checkinonline/"+id,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

function checkInSpa(id,body){
  return axios.get("http://18.216.251.104:5000/api/customer/checkinspa/"+id,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

function checkInSport(id,body){
  return axios.get("http://18.216.251.104:5000/api/customer/checkinsport/"+id,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
