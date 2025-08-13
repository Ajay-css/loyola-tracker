import axios from "axios";

const api = axios.create({
    baseURL: "https://loyola-tracker-backend.onrender.com/api/details",
});

export default api;