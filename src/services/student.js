import axios from "axios";

// const baseUrl = "http://192.168.1.6:3001";
const baseUrl = "http://localhost:3001";

/**
 * Get officers from server
 * Note: `should not be used in controller`
 * @param none
 * @returns response object from server, contains set of officers
 */

const getOfficers = async () => {
  return await axios.get(`${baseUrl}/api/students/officers`);
};

//

export { getOfficers };
