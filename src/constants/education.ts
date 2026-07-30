export interface Education {
  id: string;
  name: string;
  translationKey: string;
}

export const listEducation: Education[] = [
  { id: 'SD', name: 'SD/Sederajat', translationKey: 'SD' },
  { id: 'SMP', name: 'SMP/Sederajat', translationKey: 'SMP' },
  { id: 'SMA', name: 'SMA/Sederajat', translationKey: 'SMA' },
  { id: 'D3', name: 'D3', translationKey: 'D3' },
  { id: 'S1', name: 'S1', translationKey: 'S1' },
  { id: 'S2', name: 'S2', translationKey: 'S2' },
  { id: 'S3', name: 'S3', translationKey: 'S3' },
];
