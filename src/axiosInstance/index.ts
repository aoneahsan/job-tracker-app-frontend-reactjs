import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: false, // indicates whether or not cross-site Access-Control requests should be made using credentials
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
