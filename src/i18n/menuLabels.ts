export const menuLabelsEN: Record<string, string> = {
  'Dashboard': 'Dashboard',
  'Skema Sertifikasi': 'Schema Certification',
  'Pengguna': 'Users',
  'Laporan Asesmen': 'Assessment Report',
  'Kelola Skema': 'Manage Schema',
  'Asesmen': 'Assessment',
  'Daftar Skema Sertifikasi': 'Schema Certification List',
  'Pengajuan Skema Sertifikasi': 'Schema Certification Submission',
  'Persyaratan': 'Requirements',
  'Berkas File': 'File Upload',
  'Catatan': 'Notes',
  'Aktivitas': 'Activities',
};

export function getMenuLabel(name: string, locale: string): string {
  if (locale === 'en') return menuLabelsEN[name] || name;
  return name;
}