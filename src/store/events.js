import { create } from "zustand";

/**
 * Allows global state management (in layman's terms, allows the developer to access all events from any file)
 * Note: `should not be used in controller`
 * @method setEvents - sets all the events to the `events` variable that was fetched from the API
 *    @returns none
 * @method setScanner - a boolean that tells the app whether the QR Code Scanner is open or not.
 *    @returns none
 */

const useEventStore = create((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  scanner: "",
  setScanner: (s) => set({ scanner: s }),
}));

export default useEventStore;
