import axios from "axios";
import md5 from "md5";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
});

export default async function login({ username, password }) {
  try {
    const response = await axiosInstance.post("/auth/signin", {
      username: username,
      password: md5(password),
    });
    return response.data.token;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
    return error.config;
  }
}
