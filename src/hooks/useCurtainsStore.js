import create from 'zustand';

export const [useCurtainsStore] = create(set => ({
  curtains: null,
  setCurtains: (instance) => set({ curtains: instance })
}));
