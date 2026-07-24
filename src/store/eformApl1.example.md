# Eform APL 1 Store - Usage Example

State management untuk form APL 1, mengelola data dari PartTwo, PartTree, dan LastPart.

## Import Store

```typescript
import { useEformApl1Store } from '@/store/eformApl1';
```

## 1. PartTwo - Data Sertifikasi

### State Structure
```typescript
partTwo: {
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
```

### Usage Example
```typescript
const { partTwo, setSkemaData, setTujuanAsesmen } = useEformApl1Store();

// Update skema data
setSkemaData({ judul: 'Teknisi Komputer', nomor: 'TK-002' });

// Update tujuan asesmen
setTujuanAsesmen('sertifikasi', true);
setTujuanAsesmen('pkt', false);

// Access data
console.log(partTwo.skemaData.judul); // 'Teknisi Komputer'
console.log(partTwo.tujuanAsesmen.sertifikasi); // true
```

## 2. PartTree - Bukti Kelengkapan

### State Structure
```typescript
partTree: {
  // Key: requirement_id, Value: checkbox status
  requirementsStatus: Record<string, 'meets' | 'not_meets' | 'not_exists'>;
}
```

### Checkbox Logic
**Setiap row hanya bisa memilih 1 checkbox:**
- `meets` = Ada - Memenuhi Syarat
- `not_meets` = Ada - Tidak Memenuhi Syarat
- `not_exists` = Tidak Ada

### Usage Example
```typescript
const { partTree, setRequirementStatus, clearRequirementStatus } = useEformApl1Store();

// Set requirement status
setRequirementStatus('req-123', 'meets'); // Memenuhi Syarat
setRequirementStatus('req-456', 'not_meets'); // Tidak Memenuhi Syarat
setRequirementStatus('req-789', 'not_exists'); // Tidak Ada

// Clear requirement status
clearRequirementStatus('req-123');

// Check current status
const status = partTree.requirementsStatus['req-123']; // 'meets' | 'not_meets' | 'not_exists' | undefined
```

### Checkbox Implementation
```typescript
// Di dalam column render
<Checkbox 
  checked={partTree.requirementsStatus[requirementId] === 'meets'}
  onChange={() => setRequirementStatus(requirementId, 'meets')}
/>
```

## 3. LastPart - Rekomendasi & Tanda Tangan

### State Structure
```typescript
lastPart: {
  rekomendasi: boolean | null; // true = Diterima, false = Tidak Diterima
  tanggalPemohon: string | null; // ISO date string
  catatan: string;
  tanggalAdminLSP: string | null; // ISO date string
}
```

### Usage Example
```typescript
const { 
  lastPart, 
  setRekomendasi, 
  setTanggalPemohon, 
  setCatatan, 
  setTanggalAdminLSP 
} = useEformApl1Store();

// Set rekomendasi
setRekomendasi(true); // Diterima
setRekomendasi(false); // Tidak Diterima

// Set tanggal
setTanggalPemohon('2024-05-02T10:30:00.000Z');
setTanggalAdminLSP('2024-05-02T14:15:00.000Z');

// Set catatan
setCatatan('Catatan untuk pemohon/kandidat');

// Access data
console.log(lastPart.rekomendasi); // true
console.log(lastPart.catatan); // 'Catatan untuk pemohon/kandidat'
```

### DatePicker Integration
```typescript
import dayjs from 'dayjs';

<DatePicker 
  value={lastPart.tanggalPemohon ? dayjs(lastPart.tanggalPemohon) : null}
  onChange={(date) => setTanggalPemohon(date ? date.toISOString() : null)}
/>
```

## 4. Reset Functions

```typescript
const { resetPartTwo, resetPartTree, resetLastPart, resetAll } = useEformApl1Store();

// Reset individual parts
resetPartTwo();
resetPartTree();
resetLastPart();

// Reset all data
resetAll();
```

## Complete Example

```typescript
import { useEformApl1Store } from '@/store/eformApl1';

function MyComponent() {
  const { 
    partTwo, 
    partTree, 
    lastPart,
    setSkemaData,
    setTujuanAsesmen,
    setRequirementStatus,
    setRekomendasi,
    setCatatan,
    resetAll
  } = useEformApl1Store();

  const handleSubmit = () => {
    // Collect all data
    const formData = {
      skema: partTwo.skemaData,
      tujuan: partTwo.tujuanAsesmen,
      requirements: partTree.requirementsStatus,
      rekomendasi: lastPart.rekomendasi,
      catatan: lastPart.catatan,
      tanggalPemohon: lastPart.tanggalPemohon,
      tanggalAdminLSP: lastPart.tanggalAdminLSP,
    };

    // Submit to API
    console.log('Form Data:', formData);
    
    // Reset after submission
    resetAll();
  };

  return (
    <button onClick={handleSubmit}>
      Submit Form
    </button>
  );
}
```

## Notes

1. **Checkbox PartTree**: Ketika checkbox diklik, otomatis akan uncheck checkbox lain di row yang sama karena hanya menyimpan 1 value per requirement_id
2. **DatePicker**: Gunakan dayjs untuk konversi date ke format ISO string
3. **Reset**: Gunakan reset functions untuk clear data setelah submit atau ketika user cancel
4. **Type Safety**: Semua tipe sudah terdefinisi dengan TypeScript untuk autocomplete dan type checking
