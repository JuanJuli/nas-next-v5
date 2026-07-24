import { create } from 'zustand';

interface ModalPreviewEformState {
  isOpen: boolean;
  pdfUrl: string | null;
  isLoading: boolean;
  formName: string | null;
  
  openModal: () => void;
  closeModal: () => void;
  setPdfUrl: (url: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  setFormName: (formName: string | null) => void;
  reset: () => void;
}

export const useModalPreviewEformStore = create<ModalPreviewEformState>((set) => ({
  isOpen: false,
  pdfUrl: null,
  isLoading: false,
  formName: null,
  
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setPdfUrl: (url) => set({ pdfUrl: url }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setFormName: (formName) => set({ formName }),
  reset: () => set({ isOpen: false, pdfUrl: null, isLoading: false, formName: null }),
}));
