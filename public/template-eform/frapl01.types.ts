/**
 * TypeScript Interfaces untuk FR.APL.01 Template Data
 */

export interface TujuanAsesmen {
  sertifikasi: boolean;
  pkt: boolean;
  rpl: boolean;
  lainnya: boolean;
}

export interface UnitKompetensi {
  kodeUnit: string;
  judulUnit: string;
  standarKompetensi: string;
}

export interface BuktiDokumen {
  namaDokumen: string;
  memenuhi: boolean;
  tidakMemenuhi: boolean;
  tidakAda: boolean;
}

export interface Rekomendasi {
  diterima: boolean;
  catatan: string;
}

export interface PihakPenandatangan {
  nama: string;
  ttd: string | null; // Base64 encoded image or null
  tanggal: string;
}

export interface FRAPL01Data {
  // Bagian 1: Data Pribadi
  namaLengkap: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  kebangsaan: string;
  alamatRumah: string;
  kodePosRumah: string;
  teleponRumah: string;
  email: string;
  kualifikasiPendidikan: string;

  // Bagian 1b: Data Pekerjaan
  namaPerusahaan: string;
  jabatan: string;
  alamatKantor: string;
  kodePosKantor: string;
  teleponKantor: string;
  faxKantor: string;

  // Bagian 2: Data Sertifikasi
  judulSkema: string;
  nomorSkema: string;
  tujuanAsesmen: TujuanAsesmen;
  unitKompetensi: UnitKompetensi[];

  // Bagian 3: Bukti Kelengkapan
  buktiPersyaratanDasar: BuktiDokumen[];
  buktiAdministratif: BuktiDokumen[];

  // Bagian Rekomendasi
  rekomendasi: Rekomendasi;
  pemohon: PihakPenandatangan;
  adminLSP: PihakPenandatangan;
}

/**
 * Example usage:
 * 
 * ```typescript
 * import { FRAPL01Data } from './types/frapl01';
 * 
 * const data: FRAPL01Data = {
 *   namaLengkap: "Ahmad Budi Santoso",
 *   nik: "3201234567890123",
 *   // ... other fields
 * };
 * ```
 */
