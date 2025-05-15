import axios from 'axios';

// Create Axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true, // If you're using cookies or sessions
});

export default api;
