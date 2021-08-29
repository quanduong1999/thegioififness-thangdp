import axios from "axios";

export const missPasswordAPI = {
  missPassword,
  takePassword,
};

function missPassword(body) {
  return axios.post("http://18.216.251.104:5000/api/customer/missingpw", body);
}

function takePassword(body) {
  return axios.post("http://18.216.251.104:5000/api/customer/takenewpw", body);
}
