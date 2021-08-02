import axios from "axios";
import Cookies from "js-cookie";

export const searchAPI = {
  searchDiaDiem,
};

const token = Cookies.get("token");

function searchDiaDiem(value) {
  return axios.get(
    "http://18.216.251.104:5000/api/customer/searchdiadiem/"+value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
