import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://task-management-4tz8.onrender.com/api/v1',
});

export default axiosInstance;
