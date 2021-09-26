import axios from "axios";
import Cookies from "js-cookie";

export const onlineAPI = {
  getOnline,
  getOnlineById,
  createFeedbackOnline,
  createFeedbackStarOnline,
};

const token = Cookies.get("token");

function getOnline() {
  return axios.get("http://18.216.251.104:5000/api/customer/online", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getOnlineById(id) {
  return axios.get("http://18.216.251.104:5000/api/customer/online/" + id);
}

function createFeedbackOnline(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/customer/createfeedbackonline",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function createFeedbackStarOnline(body) {
  return axios.post(
    "http://18.216.251.104:5000/api/customer/createFeedBackStarOnline",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
