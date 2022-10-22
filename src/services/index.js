import axios from "axios";

const api = axios.create({
    baseURL: 'http://ec2-52-206-46-201.compute-1.amazonaws.com:5042/'
});

export default api;
