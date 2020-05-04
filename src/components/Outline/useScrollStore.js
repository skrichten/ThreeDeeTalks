import create from 'zustand';

export const [useScrollStore] = create(set => ({
  section: null,
  setSection: (val) => set({ section: val })
}));
