import { create } from 'zustand';

// Type for checkbox selection in PartTree
type RequirementStatus = 'meets' | 'not_meets' | 'not_exists';

interface PartTwoState {
  skemaData: {
    judul: string;
    nomor: string;
  };
  tujuanAsesmen: {
    sertifikasi: boolean;
    pkt: boolean;
    rpl: boolean;
    lainnya: boolean;
  };
}

interface PartTreeState {
  // Key: requirement_id, Value: selected checkbox status
  requirementsStatus: Record<string, RequirementStatus>;
}

interface LastPartState {
  rekomendasi: boolean | null; // true = Diterima, false = Tidak Diterima
  tanggalPemohon: string | null;
  catatan: string;
  tanggalAdminLSP: string | null;
  ttdPemohon: string | null; // Base64 string for signature image
  ttdAdminLSP: string | null; // Base64 string for signature image
}

interface EformApl1State {
  partTwo: PartTwoState;
  partTree: PartTreeState;
  lastPart: LastPartState;

  // PartTwo Actions
  setSkemaData: (data: Partial<PartTwoState['skemaData']>) => void;
  setTujuanAsesmen: (key: keyof PartTwoState['tujuanAsesmen'], value: boolean) => void;

  // PartTree Actions
  setRequirementStatus: (requirementId: string, status: RequirementStatus) => void;
  clearRequirementStatus: (requirementId: string) => void;

  // LastPart Actions
  setRekomendasi: (value: boolean | null) => void;
  setTanggalPemohon: (date: string | null) => void;
  setCatatan: (value: string) => void;
  setTanggalAdminLSP: (date: string | null) => void;
  setTtdPemohon: (ttd: string | null) => void;
  setTtdAdminLSP: (ttd: string | null) => void;

  // Reset Actions
  resetPartTwo: () => void;
  resetPartTree: () => void;
  resetLastPart: () => void;
  resetAll: () => void;
}

const initialPartTwoState: PartTwoState = {
  skemaData: {
    judul: '',
    nomor: '',
  },
  tujuanAsesmen: {
    sertifikasi: false,
    pkt: false,
    rpl: false,
    lainnya: false,
  },
};

const initialPartTreeState: PartTreeState = {
  requirementsStatus: {},
};

const initialLastPartState: LastPartState = {
  rekomendasi: null,
  tanggalPemohon: null,
  catatan: '',
  tanggalAdminLSP: null,
  ttdPemohon: null,
  ttdAdminLSP: null,
};

export const useEformApl1Store = create<EformApl1State>((set) => ({
  partTwo: initialPartTwoState,
  partTree: initialPartTreeState,
  lastPart: initialLastPartState,

  // PartTwo Actions
  setSkemaData: (data) =>
    set((state) => ({
      partTwo: {
        ...state.partTwo,
        skemaData: {
          ...state.partTwo.skemaData,
          ...data,
        },
      },
    })),

  setTujuanAsesmen: (key, value) =>
    set((state) => ({
      partTwo: {
        ...state.partTwo,
        tujuanAsesmen: {
          ...state.partTwo.tujuanAsesmen,
          [key]: value,
        },
      },
    })),

  // PartTree Actions
  setRequirementStatus: (requirementId, status) =>
    set((state) => ({
      partTree: {
        ...state.partTree,
        requirementsStatus: {
          ...state.partTree.requirementsStatus,
          [requirementId]: status,
        },
      },
    })),

  clearRequirementStatus: (requirementId) =>
    set((state) => {
      const newStatus = { ...state.partTree.requirementsStatus };
      delete newStatus[requirementId];
      return {
        partTree: {
          ...state.partTree,
          requirementsStatus: newStatus,
        },
      };
    }),

  // LastPart Actions
  setRekomendasi: (value) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        rekomendasi: value,
      },
    })),

  setTanggalPemohon: (date) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        tanggalPemohon: date,
      },
    })),

  setCatatan: (value) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        catatan: value,
      },
    })),

  setTanggalAdminLSP: (date) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        tanggalAdminLSP: date,
      },
    })),

  setTtdPemohon: (ttd) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        ttdPemohon: ttd,
      },
    })),

  setTtdAdminLSP: (ttd) =>
    set((state) => ({
      lastPart: {
        ...state.lastPart,
        ttdAdminLSP: ttd,
      },
    })),

  // Reset Actions
  resetPartTwo: () =>
    set((state) => ({
      partTwo: initialPartTwoState,
    })),

  resetPartTree: () =>
    set((state) => ({
      partTree: initialPartTreeState,
    })),

  resetLastPart: () =>
    set((state) => ({
      lastPart: initialLastPartState,
    })),

  resetAll: () =>
    set({
      partTwo: initialPartTwoState,
      partTree: initialPartTreeState,
      lastPart: initialLastPartState,
    }),
}));
