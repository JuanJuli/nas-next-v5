import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HistoryEntry {
  pathname: string;
  search: string;
}

interface HistoryState {
  stack: HistoryEntry[];
  maxLength: number;
  push: (entry: HistoryEntry) => void;
  replaceTop: (entry: HistoryEntry) => void;
  pop: () => HistoryEntry | undefined;
  getHardBackTarget: (currentBasePath: string) => { entry: HistoryEntry; index: number } | undefined;
  trimTo: (index: number) => void;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      stack: [],
      maxLength: 50,

      push: (entry) =>
        set((s) => {
          const next = [...s.stack, entry];
          if (next.length > s.maxLength) {
            next.splice(0, next.length - s.maxLength);
          }
          return { stack: next };
        }),

      replaceTop: (entry) =>
        set((s) => {
          if (s.stack.length === 0) return { stack: [entry] };
          const next = [...s.stack];
          next[next.length - 1] = entry;
          return { stack: next };
        }),

      pop: () => {
        const s = get();
        if (s.stack.length <= 1) return undefined;
        const target = s.stack[s.stack.length - 2];
        set({ stack: s.stack.slice(0, -1) });
        return target;
      },

      getHardBackTarget: (currentBasePath) => {
        const s = get();
        for (let i = s.stack.length - 2; i >= 0; i--) {
          if (s.stack[i].pathname !== currentBasePath) {
            return { entry: s.stack[i], index: i };
          }
        }
        return undefined;
      },

      trimTo: (index) =>
        set((s) => ({
          stack: s.stack.slice(0, index + 1),
        })),

      clear: () => set({ stack: [] }),
    }),
    { name: "nav-history" }
  )
);
