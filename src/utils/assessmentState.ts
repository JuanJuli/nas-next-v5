export const asesmentState = [
  {
    id: 1,
    value: 'draft',
    label: 'Draft',
  },
  {
    id: 2,
    value: 'pra_assessment',
    label: 'Pra Asesmen',
  },
  {
    id: 3,
    value: 'assessment',
    label: 'Asesmen',
  },
  {
    id: 4,
    value: 'assessment_finish',
    label: 'Asesmen Selesai',
  },
  {
    id: 5,
    value: 'pleno',
    label: 'Rapat Komtek',
  },
  {
    id: 6,
    value: 'pleno_finish',
    label: 'Rapat Komtek Selesai',
  },
  {
    id: 7,
    value: 'print_certificate',
    label: 'Penerbitan Sertifikat',
  },
  {
    id: 8,
    value: 'completed',
    label: 'Lengkap',
  },
];

export const allAsesmentState = [
  {
    id: 1,
    value: 'draft',
    label: 'Draft',
  },
  {
    id: 2,
    value: 'pra_assessment',
    label: 'Pra Asesmen',
  },
  {
    id: 3,
    value: 'assessment',
    label: 'Asesmen',
  },
  {
    id: 4,
    value: 'assessment_finish',
    label: 'Asesmen Selesai',
  },
  {
    id: 5,
    value: 'pleno',
    label: 'Rapat Komtek',
  },
  {
    id: 6,
    value: 'pleno_finish',
    label: 'Rapat Komtek Selesai',
  },
  {
    id: 7,
    value: 'print_certificate',
    label: 'Penerbitan Sertifikat',
  },
  {
    id: 8,
    value: 'completed',
    label: 'Lengkap',
  },
  {
    id: 9,
    value: 'archived',
    label: 'Arsip',
  },
];

export function convertAsesmenStateLabel(state: string) {
  const lowerState = state.toLowerCase();
  const asesmentStateFind = asesmentState.find(item => item.value === lowerState);
  if (asesmentStateFind) {
    return asesmentStateFind.label;
  }

  if (lowerState === 'archived') return 'Arsip';

  return '-';
}
