import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Headers": "X-Requested-With, privatekey",
  },
});
export default axiosClient;
