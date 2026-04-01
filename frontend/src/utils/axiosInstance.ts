import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,    
});

export default axiosInstance;