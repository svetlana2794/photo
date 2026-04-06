import { create } from "zustand";

const createCanvasSlice = (set) => ({
  canvas: null,
  setCanvas: (c) => set({ canvas: c }),
});

const createSelObjSlice = (set) => ({
  selObj: null,
  changeSelObj: (obj) => set({ selObj: obj }),
});

export const useStore = create((...a) => ({
  ...createCanvasSlice(...a),
  ...createSelObjSlice(...a),
}));
