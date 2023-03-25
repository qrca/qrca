import axios from "axios";

// const baseUrl = "https://qrca-api.onrender.com";
const baseUrl = "http://192.168.1.9:3001";
// const baseUrl = "http://localhost:3001";

const login = async (password) => {
  const data = {
    password: password,
  };
  return await axios.post(`${baseUrl}/api/login`, data);
};

export { login };
