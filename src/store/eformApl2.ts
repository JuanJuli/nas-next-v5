import { create } from 'zustand';

// Type for checkbox selection in PartTwo (K = Kompeten, BK = Belum Kompeten)
type RequirementAssessment = 'k' | 'bk' | null;

interface PartOneState {
  skemaData: {
    judul: string;
    nomor: string;
  };
}

interface PartTwoState {
  // Key: requirement_id, Value: assessment status (k or bk)
  requirementsAssessment: Record<string, RequirementAssessment>;
  // Store expanded elements state
  expandedElements: Set<string>;
}

interface LastPartState {
  rekomendasi: boolean | null; // true = Dilanjutkan, false = Tidak Dilanjutkan
  // Asesi (Pemohon)
  pemohonNama: string;
  pemohonTtd: string | null; // Base64 string for signature image
  pemohonTanggal: string | null;
  // Asesor
  asesorNoReg: string;
  asesorNama: string;
  asesorTtd: string | null; // Base64 string for signature image
  asesorTanggal: string | null;
}

export interface EformApl2State {
  partOne: PartOneState;
  partTwo: PartTwoState;
  lastPart: LastPartState;

  // PartOne Actions
  setSkemaData: (data: Partial<PartOneState['skemaData']>) => void;

  // PartTwo Actions
  setRequirementAssessment: (requirementId: string, assessment: RequirementAssessment) => void;
  clearRequirementAssessment: (requirementId: string) => void;
  toggleExpandedElement: (elementId: string) => void;
  clearExpandedElements: () => void;

  // LastPart Actions
  setRekomendasi: (value: boolean | null) => void;
  setPemohonNama: (value: string) => void;
  setPemohonTtd: (ttd: string | null) => void;
  setPemohonTanggal: (date: string | null) => void;
  setAsesorNoReg: (value: string) => void;
  setAsesorNama: (value: string) => void;
  setAsesorTtd: (ttd: string | null) => void;
  setAsesorTanggal: (date: string | null) => void;

  // Reset Actions
  resetPartOne: () => void;
  resetPartTwo: () => void;
  resetLastPart: () => void;
  resetAll: () => void;
}

const initialPartOneState: PartOneState = {
  skemaData: {
    judul: '',
    nomor: '',
  },
};

const initialPartTwoState: PartTwoState = {
  requirementsAssessment: {},
  expandedElements: new Set<string>(),
};

const initialLastPartState: LastPartState = {
  rekomendasi: null,
  pemohonNama: '',
  pemohonTtd: null,
  pemohonTanggal: null,
  asesorNoReg: '',
  asesorNama: '',
  asesorTtd: null,
  asesorTanggal: null,
};

export const useEformApl2Store = create<EformApl2State>((set) => ({
  partOne: initialPartOneState,
  partTwo: initialPartTwoState,
  lastPart: initialLastPartState,

  // PartOne Actions
  setSkemaData: (data) =>
    set((state) => ({
      partOne: {
        ...state.partOne,
        skemaData: {
          ...state.partOne.skemaData,
          ...data,
        },
      },
    })),

  // PartTwo Actions
  setRequirementAssessment: (requirementId, assessment) =>
    set((state) => ({
      partTwo: {
        ...state.partTwo,
        requirementsAssessment: {
          ...state.partTwo.requirementsAssessment,
          [requirementId]: assessment,
        },
      },
    })),

  clearRequirementAssessment: (requirementId) =>
    set((state) => {
      const { [requirementId]: _, ...rest } = state.partTwo.requirementsAssessment;
      return {
        partTwo: {
          ...state.partTwo,
          requirementsAssessment: rest,
        },
      };
    }),

  toggleExpandedElement: (elementId) =>
    set((state) => {
      const newExpandedElements = new Set(state.partTwo.expandedElements);
      if (newExpandedElements.has(elementId)) {
        newExpandedElements.delete(elementId);
      } else {
        newExpandedElements.add(elementId);
      }
      return {
        partTwo: {
          ...state.partTwo,
          expandedElements: newExpandedElements,
        },
      };
    }),

  clearExpandedElements: () =>
    set((state) => ({
      partTwo: {
        ...state.partTwo,
        expandedElements: new Set<string>(),
      },
    })),

  // LastPart Actions
  setRekomendasi: (value) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        rekomendasi: value,
      },
    })),

  setPemohonNama: (value) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        pemohonNama: value,
      },
    })),

  setPemohonTtd: (ttd) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        pemohonTtd: ttd,
      },
    })),

  setPemohonTanggal: (date) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        pemohonTanggal: date,
      },
    })),

  setAsesorNoReg: (value) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        asesorNoReg: value,
      },
    })),

  setAsesorNama: (value) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        asesorNama: value,
      },
    })),

  setAsesorTtd: (ttd) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        asesorTtd: ttd,
      },
    })),

  setAsesorTanggal: (date) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        asesorTanggal: date,
      },
    })),

  // Reset Actions
  resetPartOne: () =>
    set({
      partOne: initialPartOneState,
    }),

  resetPartTwo: () =>
    set({
      partTwo: initialPartTwoState,
    }),

  resetLastPart: () =>
    set({
      lastPart: initialLastPartState,
    }),

  resetAll: () =>
    set({
      partOne: initialPartOneState,
      partTwo: initialPartTwoState,
      lastPart: initialLastPartState,
    }),
}));
