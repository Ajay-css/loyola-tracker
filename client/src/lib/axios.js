import axios from "axios";

const api = axios.create({
    baseURL: "https://loyola-tracker-backend.onrender.com/api/details",
    withCredentials : true
});

export default api;