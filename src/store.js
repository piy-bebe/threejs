import { create } from 'zustand'

export const useInformer = create((set, get) => ({
  id: 0,
  change: (id) => {
    set({ id: id })
  },
}))
