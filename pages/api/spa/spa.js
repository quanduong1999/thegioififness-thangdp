import axios from "axios";
import Cookies from "js-cookie";

export const spaAPI = {
  getSpa,
  getSpaById,
  createPrivateSpa,
  createFeedbackSpa,
  createFeedbackStarSpa,
  buySpa,
  getBuySpa,
};

const token = Cookies.get("token");

function getSpa() {
  return axios.get("http://18.216.251.104:5000/api/customer/getspa");
}

function getSpaById(id) {
  return axios.get("http://18.216.251.104:5000/api/customer/getSpaById/" + id);
}

function createPrivateSpa(body) {
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

function createFeedbackSpa(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/customer/createfeedbackspa",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function createFeedbackStarSpa(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/customer/createfeedbackstartspa",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function buySpa(body) {
  return axios.post("http://18.216.251.104:5000/api/customer/buyspa", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getBuySpa() {
  return axios.get("http://18.216.251.104:5000/api/customer/getbuyspa", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
