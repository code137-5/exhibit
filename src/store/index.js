import create from 'zustand';

export const useStore = create((set) => ({
  cyanSpeed: 2,
  blueSpeed: -1.8,
  redSpeed: 2.1,
  greenSpeed: 2,
  yellowSpeed: -2.5,
  setSpeed: (newSpeed, valueName) => set((state) => ({ [valueName]: newSpeed }))
}))
