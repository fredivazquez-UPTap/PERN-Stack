import axios from "axios";
import CryptoJS from "crypto-js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
});

export default async function login({ email, password }) {
  try {
    const response = await axiosInstance.post("/auth/signin", {
      email: email,
      password: password,
    });
    return response.data.user;
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
