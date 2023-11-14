import axios from "axios";

// const baseUrl = "http://192.168.1.6:3001";
const baseUrl = "http://localhost:3001";

/**
 * Fetch events
 * Note: `should not be used in controller`
 * @param none
 * @returns response object from server, contains set of events
 */

const getEvents = async () => {
  return await axios.get(`${baseUrl}/api/events`);
};

/**
 * Creates a new event
 * Note: `should not be used in controller`
 * @param eventData, check AddEvent.tsx for object type
 * @returns response object from server containing new event (mostly for event validation)
 */

const postEvent = async (eventData) => {
  return await axios.post(`${baseUrl}/api/events`, eventData);
};

/**
 * Excuse student, excuses student from event
 * Note: `should not be used in controller`
 * @param eventId (obtained from mongoDB), studentId (20XX-X-XXXX)
 * @returns response object from server, contains set of events
 */

const excuseStudent = async (studentId, eventId) => {
  return await axios.put(`${baseUrl}/api/events/excuse/${eventId}`, {
    studentId,
  });
};

export { getEvents, postEvent, excuseStudent };
