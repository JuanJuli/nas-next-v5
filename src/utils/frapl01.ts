/**
 * Utility functions untuk FR.APL.01 Template
 */

import type { FRAPL01Data, TujuanAsesmen, BuktiDokumen } from '@/types/frApl01';

/**
 * Render template FR.APL.01 dengan memanggil API
 */
export async function renderFRAPL01(data: FRAPL01Data): Promise<string> {
  const response = await fetch('/api/eform/render-apl01', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to render template');
  }

  return await response.text();
}

/**
 * Convert base64 string ke File object untuk tanda tangan
 */
export function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
}

/**
 * Convert File/Blob ke base64 string
 */
export function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

/**
 * Validate tujuan asesmen (hanya satu yang boleh true)
 */
export function validateTujuanAsesmen(tujuan: TujuanAsesmen): boolean {
  const selected = Object.values(tujuan).filter(v => v === true);
  return selected.length === 1;
}

/**
 * Validate bukti dokumen (hanya satu checkbox yang boleh checked)
 */
export function validateBuktiDokumen(bukti: BuktiDokumen): boolean {
  const selected = [bukti.memenuhi, bukti.tidakMemenuhi, bukti.tidakAda].filter(v => v === true);
  return selected.length === 1;
}

/**
 * Convert FRAPL01Data dari store ke format yang siap dirender
 */
export function prepareFRAPL01Data(
  partOneData: any,
  partTwoData: any,
  partThreeData: any,
  lastPartData: any
): FRAPL01Data {
  return {
    // Bagian 1: Data Pribadi
    namaLengkap: partOneData.namaLengkap || '',
    nik: partOneData.nik || '',
    tempatLahir: partOneData.tempatLahir || '',
    tanggalLahir: partOneData.tanggalLahir || '',
    jenisKelamin: partOneData.jenisKelamin || '',
    kebangsaan: partOneData.kebangsaan || 'WNI',
    alamatRumah: partOneData.alamatRumah || '',
    kodePosRumah: partOneData.kodePosRumah || '',
    teleponRumah: partOneData.teleponRumah || '',
    email: partOneData.email || '',
    kualifikasiPendidikan: partOneData.kualifikasiPendidikan || '',

    // Bagian 1b: Data Pekerjaan
    namaPerusahaan: partOneData.namaPerusahaan || '',
    jabatan: partOneData.jabatan || '',
    alamatKantor: partOneData.alamatKantor || '',
    kodePosKantor: partOneData.kodePosKantor || '',
    teleponKantor: partOneData.teleponKantor || '',
    faxKantor: partOneData.faxKantor || '',

    // Bagian 2: Data Sertifikasi
    judulSkema: partTwoData.skemaData.judul || '',
    nomorSkema: partTwoData.skemaData.nomor || '',
    tujuanAsesmen: partTwoData.tujuanAsesmen,
    unitKompetensi: partTwoData.unitKompetensi || [],

    // Bagian 3: Bukti Kelengkapan
    buktiPersyaratanDasar: partThreeData.buktiPersyaratanDasar || [],
    buktiAdministratif: partThreeData.buktiAdministratif || [],

    // Bagian Rekomendasi
    rekomendasi: {
      diterima: lastPartData.rekomendasi === true,
      catatan: lastPartData.catatan || '',
    },
    pemohon: {
      nama: partOneData.namaLengkap || '',
      ttd: lastPartData.ttdPemohon || null,
      tanggal: lastPartData.tanggalPemohon || '',
    },
    adminLSP: {
      nama: lastPartData.namaAdminLSP || '',
      ttd: lastPartData.ttdAdminLSP || null,
      tanggal: lastPartData.tanggalAdminLSP || '',
    },
  };
}

/**
 * Download HTML as file
 */
export function downloadHTML(html: string, filename: string = 'FR.APL.01.html') {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Open HTML in new window for preview/print
 */
export function previewHTML(html: string) {
  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(html);
    newWindow.document.close();
  }
}

/**
 * Print HTML directly
 */
export function printHTML(html: string) {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  
  document.body.appendChild(iframe);
  
  const iframeDoc = iframe.contentWindow?.document;
  if (iframeDoc) {
    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();
    
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }
}
