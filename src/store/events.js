import { create } from "zustand";

const useEventStore = create((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  scanner: "",
}));

export default useEventStore;
