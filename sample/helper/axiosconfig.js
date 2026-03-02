import axios from 'axios';


// create a new instance of Axios for API requests
const api = axios.create({
  baseURL: process.env.NODE_ENV == "production" ? "https://api.lekkiscrabbleclub.com/api" : "http://localhost:8000/api/",
  // timeout: 10000,
});

// export the API instance
export default api;