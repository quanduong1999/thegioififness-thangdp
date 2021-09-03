import axios from "axios";
import Cookies from "js-cookie";

export const sportAPI = {
  getSport,
  getSportById,
  createPrivateSport,
  createFeedbackSport,
  createFeedbackStarSport,
};

const token = Cookies.get("token");

function getSport() {
  return axios.get("http://18.216.251.104:5000/api/customer/getsport");
}

function getSportById(id) {
  return axios.get("http://18.216.251.104:5000/api/customer/getSport/" + id);
}

function createPrivateSport(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/customer/createPrivateSport",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function createFeedbackSport(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/customer/createfeedbacksport",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function createFeedbackStarSport(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/customer/createfeedbackstartsport",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
