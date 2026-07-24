# E-Form APL2 State Management Documentation

## Overview
State management untuk form FR.APL.02 (Asesmen Mandiri) menggunakan Zustand store.

## Store Structure

### PartOne State
Menyimpan informasi skema sertifikasi (hanya untuk display, data berasal dari context).

```typescript
{
  skemaData: {
    judul: string;
    nomor: string;
  }
}
```

### PartTwo State
Menyimpan assessment untuk setiap requirement (element).

```typescript
{
  requirementsAssessment: Record<string, 'k' | 'bk' | null>;
  // Key: requirement_id
  // Value: 'k' (Kompeten) atau 'bk' (Belum Kompeten)
  
  expandedElements: Set<string>;
  // Menyimpan state expand/collapse untuk KUK
}
```

**Contoh:**
```typescript
{
  requirementsAssessment: {
    "req-123": "k",      // Requirement ini dinilai Kompeten
    "req-456": "bk",     // Requirement ini dinilai Belum Kompeten
    "req-789": null      // Belum dinilai
  }
}
```

### LastPart State
Menyimpan data rekomendasi dan tanda tangan.

```typescript
{
  // Rekomendasi
  rekomendasi: boolean | null;  // true = Dilanjutkan, false = Tidak Dilanjutkan
  
  // Data Pemohon/Asesi
  pemohonNama: string;
  pemohonTtd: string | null;    // Base64 image
  pemohonTanggal: string | null; // ISO date string
  
  // Data Asesor
  asesorNoReg: string;
  asesorNama: string;
  asesorTtd: string | null;     // Base64 image
  asesorTanggal: string | null;  // ISO date string
}
```

## Actions

### PartOne Actions
- `setSkemaData(data)` - Update data skema

### PartTwo Actions
- `setRequirementAssessment(requirementId, assessment)` - Set penilaian K/BK untuk requirement
- `clearRequirementAssessment(requirementId)` - Hapus penilaian requirement
- `toggleExpandedElement(elementId)` - Toggle expand/collapse KUK
- `clearExpandedElements()` - Clear semua expanded elements

### LastPart Actions
- `setRekomendasi(value)` - Set rekomendasi (true/false/null)
- `setPemohonNama(value)` - Set nama pemohon
- `setPemohonTtd(ttd)` - Set tanda tangan pemohon (base64)
- `setPemohonTanggal(date)` - Set tanggal tanda tangan pemohon
- `setAsesorNoReg(value)` - Set nomor registrasi asesor
- `setAsesorNama(value)` - Set nama asesor
- `setAsesorTtd(ttd)` - Set tanda tangan asesor (base64)
- `setAsesorTanggal(date)` - Set tanggal tanda tangan asesor

### Reset Actions
- `resetPartOne()` - Reset data part one
- `resetPartTwo()` - Reset data part two (assessment & expanded)
- `resetLastPart()` - Reset data last part
- `resetAll()` - Reset semua data

## Usage Example

### In Component
```typescript
import { useEformApl2Store } from '@/store/eformApl2';

function MyComponent() {
  const { partTwo, setRequirementAssessment } = useEformApl2Store();
  
  // Set penilaian Kompeten
  setRequirementAssessment('req-123', 'k');
  
  // Set penilaian Belum Kompeten
  setRequirementAssessment('req-456', 'bk');
  
  // Clear penilaian
  setRequirementAssessment('req-789', null);
  
  // Get penilaian
  const assessment = partTwo.requirementsAssessment['req-123']; // 'k'
}
```

### In Preview Function (Apl2.tsx)
```typescript
const previewEform = async () => {
  const { partTwo, lastPart } = useEformApl2Store();
  
  // Mapping data untuk template
  const payload = {
    unitKompetensi: unitList.map(unit => ({
      requirement: requirements.map(req => ({
        k: partTwo.requirementsAssessment[req.requirement_id] === 'k',
        bk: partTwo.requirementsAssessment[req.requirement_id] === 'bk',
      }))
    })),
    rekomendasi: {
      dilanjutkan: lastPart.rekomendasi === true,
      tidakDilanjutkan: lastPart.rekomendasi === false,
    },
    pemohon: {
      nama: lastPart.pemohonNama,
      ttd: lastPart.pemohonTtd,
      tanggal: lastPart.pemohonTanggal,
    },
    assessor: {
      noReg: lastPart.asesorNoReg,
      nama: lastPart.asesorNama,
      ttd: lastPart.asesorTtd,
      tanggal: lastPart.asesorTanggal,
    }
  };
};
```

## Template Mapping (FR.APL.02 Template.html)

Data dari store dimapping ke template Handlebars sebagai berikut:

```handlebars
{{#each unitKompetensi}}
  {{#each requirement}}
    <!-- Checkbox K (Kompeten) -->
    <input {{#if k}}checked{{/if}} type="checkbox" />
    
    <!-- Checkbox BK (Belum Kompeten) -->
    <input {{#if bk}}checked{{/if}} type="checkbox" />
    
    <!-- QR Code untuk lampiran -->
    {{#if file}}
      <img src="{{file}}" />
    {{/if}}
  {{/each}}
{{/each}}

<!-- Rekomendasi -->
{{#if rekomendasi.dilanjutkan}}
  Asesmen Dapat / <span style="text-decoration: line-through;">tidak dapat dilanjutkan</span>
{{else}}
  {{#if rekomendasi.tidakDilanjutkan}}
    <span style="text-decoration: line-through;">Asesmen Dapat</span> / tidak dapat dilanjutkan
  {{/if}}
{{/if}}

<!-- Tanda Tangan Pemohon -->
{{#if pemohon.ttd}}
  <img src="{{pemohon.ttd}}" />
{{/if}}
{{pemohon.tanggal}}

<!-- Tanda Tangan Asesor -->
{{#if assessor.ttd}}
  <img src="{{assessor.ttd}}" />
{{/if}}
{{assessor.tanggal}}
```

## Notes

1. **Checkbox Logic**: K dan BK adalah mutually exclusive. Ketika salah satu dichecked, yang lain otomatis unchecked.

2. **Date Format**: Tanggal disimpan dalam format ISO string di store, dan diformat ke "DD MMMM YYYY" saat preview/submit.

3. **Signature**: Tanda tangan disimpan sebagai base64 data URL (e.g., `data:image/png;base64,...`).

4. **QR Code**: QR code untuk lampiran digenerate on-the-fly saat preview, bukan disimpan di store.

5. **Auto-populate**: Nama dan tanda tangan pemohon otomatis diisi dari data requirement context jika tersedia.

## Data Flow

```
User Input → Store (Zustand) → Preview Function → Template Payload → PDF API → Preview Modal
```

1. User mengisi form (checkbox K/BK, rekomendasi, tanda tangan)
2. Data disimpan ke Zustand store via actions
3. Saat preview, data dari store dikumpulkan dan diformat
4. Data dikirim ke PDF API dengan template name
5. PDF ditampilkan di modal preview
