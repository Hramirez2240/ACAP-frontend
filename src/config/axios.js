import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://localhost:44343/api/"
});

export default axiosClient;