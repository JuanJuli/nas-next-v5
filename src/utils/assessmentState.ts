export const asesmentState = [
  {
    id: 1,
    value: 'draft',
    label: { id: 'Draft', en: 'Draft' },
  },
  {
    id: 2,
    value: 'pra_assessment',
    label: { id: 'Pra Asesmen', en: 'Pre Assessment' },
  },
  {
    id: 3,
    value: 'assessment',
    label: { id: 'Asesmen', en: 'Assessment' },
  },
  {
    id: 4,
    value: 'assessment_finish',
    label: { id: 'Asesmen Selesai', en: 'Assessment Complete' },
  },
  {
    id: 5,
    value: 'pleno',
    label: { id: 'Rapat Komtek', en: 'Pleno Meeting' },
  },
  {
    id: 6,
    value: 'pleno_finish',
    label: { id: 'Rapat Komtek Selesai', en: 'Pleno Meeting Complete' },
  },
  {
    id: 7,
    value: 'print_certificate',
    label: { id: 'Penerbitan Sertifikat', en: 'Certificate Issuance' },
  },
  {
    id: 8,
    value: 'completed',
    label: { id: 'Lengkap', en: 'Completed' },
  },
];

export const allAsesmentState = [
  {
    id: 1,
    value: 'draft',
    label: { id: 'Draft', en: 'Draft' },
  },
  {
    id: 2,
    value: 'pra_assessment',
    label: { id: 'Pra Asesmen', en: 'Pre Assessment' },
  },
  {
    id: 3,
    value: 'assessment',
    label: { id: 'Asesmen', en: 'Assessment' },
  },
  {
    id: 4,
    value: 'assessment_finish',
    label: { id: 'Asesmen Selesai', en: 'Assessment Complete' },
  },
  {
    id: 5,
    value: 'pleno',
    label: { id: 'Rapat Komtek', en: 'Pleno Meeting' },
  },
  {
    id: 6,
    value: 'pleno_finish',
    label: { id: 'Rapat Komtek Selesai', en: 'Pleno Meeting Complete' },
  },
  {
    id: 7,
    value: 'print_certificate',
    label: { id: 'Penerbitan Sertifikat', en: 'Certificate Issuance' },
  },
  {
    id: 8,
    value: 'completed',
    label: { id: 'Lengkap', en: 'Completed' },
  },
  {
    id: 9,
    value: 'archived',
    label: { id: 'Arsip', en: 'Archived' },
  },
];

export function convertAsesmenStateLabel(state: string, locale: string = 'id'): string {
  const lowerState = state.toLowerCase();
  const entry = asesmentState.find(item => item.value === lowerState);
  if (entry) return entry.label[locale as keyof typeof entry.label] || entry.label.id;
  if (lowerState === 'archived') return locale === 'en' ? 'Archived' : 'Arsip';
  return '-';
}