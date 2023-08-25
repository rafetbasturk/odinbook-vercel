import axios from "axios";

const apiFetch = axios.create({
  baseURL: "https://odinbook-vercel.vercel.app",
  withCredentials: true,
});

// apiFetch.interceptors.request.use(
//   (request) => {
//     // request.headers['Accept'] = `application/json`;
//     return request;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// apiFetch.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log(error.response);
//     return Promise.reject(error);
//   }
// );

export default apiFetch;
