import axios from "axios";

// const baseUrl = "https://qrca-api.onrender.com";
const baseUrl = "http://192.168.1.9:3001";
// const baseUrl = "http://localhost:3001";

const getEvents = async () => {
  return await axios.get(`${baseUrl}/api/events`);
};

const postEvent = async (eventData) => {
  return await axios.post(`${baseUrl}/api/events`, eventData);
};

export { getEvents, postEvent };
