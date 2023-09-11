import { create } from "zustand";

// global state controls for open the modal from wherever you want

interface useProModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProModal = create<useProModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
