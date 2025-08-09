"use client"

import { create } from "zustand"

interface TourModalStore {
  isOpen: boolean
  openTourModal: () => void
  closeTourModal: () => void
}

export const useTourModal = create<TourModalStore>((set) => ({
  isOpen: false,
  openTourModal: () => set({ isOpen: true }),
  closeTourModal: () => set({ isOpen: false }),
}))
