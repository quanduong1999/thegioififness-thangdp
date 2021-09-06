import axios from "axios";
import Cookies from "js-cookie";

export const checkInAPI = {
  checkIn,
  checkInOnline,
  checkInSpa,
  checkInSport,
};

const token = Cookies.get("token");

function checkIn(id, body) {
  return axios.post(
    "http://18.216.251.104:5000/api/customer/checkin/" + id,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function checkInOnline(id, body) {
  return axios.get(
    "http://18.216.251.104:5000/api/customer/checkinonline/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function checkInSpa(id, body) {
  return axios.get("http://18.216.251.104:5000/api/customer/checkinspa/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function checkInSport(id, body) {
  return axios.get(
    "http://18.216.251.104:5000/api/customer/checkinsport/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
