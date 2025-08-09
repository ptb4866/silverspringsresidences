"use client";

import { create } from "zustand";

export const useTourModal = create((set) => ({
  isOpen: false,
  openTourModal: () => set({ isOpen: true }),
  closeTourModal: () => set({ isOpen: false }),
}));
