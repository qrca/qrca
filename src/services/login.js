import axios from "axios";

// const baseUrl = "http://192.168.1.6:3001";
const baseUrl = "http://localhost:3001";

/**
 * Login
 * Note: `should not be used in controller`
 * @param password from input of type string
 * @returns response object from server, status 401 is unauthorized, status 200 implies correct credentials
 */

const login = async (password) => {
  const data = {
    password: password,
  };
  return await axios.post(`${baseUrl}/api/login`, data);
};

export { login };
