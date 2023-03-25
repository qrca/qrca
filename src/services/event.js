import axios from "axios";

// const baseUrl = "https://qrca-api.onrender.com";
const baseUrl = "http://192.168.1.6:3001";
// const baseUrl = "http://localhost:3001";

const getEvents = async () => {
  return await axios.get(`${baseUrl}/api/events`);
};

const postEvent = async (eventData) => {
  return await axios.post(`${baseUrl}/api/events`, eventData);
};

const excuseStudent = async (studentId, eventId) => {
  return await axios.put(`${baseUrl}/api/events/excuse/${eventId}`, {
    studentId,
  });
};

export { getEvents, postEvent, excuseStudent };
