import { create } from "zustand";

const useEventStore = create((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  scanner: "",
  setScanner: (s) => set({ scanner: s }),
}));

export default useEventStore;
