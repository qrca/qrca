import axios from "axios";

// const baseUrl = "https://qrca-api.onrender.com";
const baseUrl = "http://192.168.1.9:3001";
// const baseUrl = "http://localhost:3001";

const getOfficers = async () => {
  return await axios.get(`${baseUrl}/api/students/officers`);
};

export { getOfficers };
