import { RequirementFile } from "@/types/requirement";
import { create } from "zustand";

interface ModalAttachmentState {
  open: boolean;
  setOpen: (open: boolean) => void;
  requirementID: string | null;
  setRequirementID: (requirementID: string | null) => void;
  requirementFiles: RequirementFile[]; // Add requirementFiles to the state
  setRequirementFiles: (files: RequirementFile[]) => void; // Add a setter for requirementFiles
}

export const useModalAttachmentStore = create<ModalAttachmentState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  requirementID: null,
  setRequirementID: (requirementID) => set({ requirementID }),
  requirementFiles: [], // Initialize requirementFiles as an empty array
  setRequirementFiles: (files) => set({ requirementFiles: files }), // Implement the setter for requirementFiles
}));