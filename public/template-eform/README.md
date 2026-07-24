# FR.APL.01 Template - Handlebars

Template HTML untuk Form Permohonan Sertifikasi Kompetensi yang siap dirender menggunakan Handlebars.

## File-file yang Tersedia

- `FR.APL.01 Template Base.html` - Template HTML dengan Handlebars placeholders
- `handlebars-helpers.js` - Helper functions untuk Handlebars
- `sample-data.json` - Contoh data untuk render template
- `render-template.js` - Script untuk merender template dengan data

## Instalasi

Pastikan Handlebars sudah terinstall:

```bash
npm install handlebars
# atau
pnpm install handlebars
```

## Cara Menggunakan

### 1. Menggunakan Script Node.js

```bash
node public/template-eform/render-template.js
```

Script ini akan:
- Membaca template dari `FR.APL.01 Template Base.html`
- Membaca data dari `sample-data.json`
- Render template dengan data
- Menyimpan hasil ke `FR.APL.01 Rendered.html`

### 2. Menggunakan Programmatically

```javascript
const { renderTemplate } = require('./public/template-eform/render-template');

// Data untuk render
const data = {
  namaLengkap: "Ahmad Budi Santoso",
  nik: "3201234567890123",
  // ... data lainnya
};

// Render template
const html = renderTemplate('./public/template-eform/FR.APL.01 Template Base.html', data);

// Gunakan html yang sudah dirender
console.log(html);
```

## Struktur Data

Template ini membutuhkan data dengan struktur sebagai berikut:

### Bagian 1: Data Pribadi
```json
{
  "namaLengkap": "string",
  "nik": "string",
  "tempatLahir": "string",
  "tanggalLahir": "string",
  "jenisKelamin": "string",
  "kebangsaan": "string",
  "alamatRumah": "string",
  "kodePosRumah": "string",
  "teleponRumah": "string",
  "email": "string",
  "kualifikasiPendidikan": "string"
}
```

### Bagian 1b: Data Pekerjaan
```json
{
  "namaPerusahaan": "string",
  "jabatan": "string",
  "alamatKantor": "string",
  "kodePosKantor": "string",
  "teleponKantor": "string",
  "faxKantor": "string"
}
```

### Bagian 2: Data Sertifikasi
```json
{
  "judulSkema": "string",
  "nomorSkema": "string",
  "tujuanAsesmen": {
    "sertifikasi": boolean,
    "pkt": boolean,
    "rpl": boolean,
    "lainnya": boolean
  },
  "unitKompetensi": [
    {
      "kodeUnit": "string",
      "judulUnit": "string",
      "standarKompetensi": "string"
    }
  ]
}
```

### Bagian 3: Bukti Kelengkapan
```json
{
  "buktiPersyaratanDasar": [
    {
      "namaDokumen": "string",
      "memenuhi": boolean,
      "tidakMemenuhi": boolean,
      "tidakAda": boolean
    }
  ],
  "buktiAdministratif": [
    {
      "namaDokumen": "string",
      "memenuhi": boolean,
      "tidakMemenuhi": boolean,
      "tidakAda": boolean
    }
  ]
}
```

### Bagian Rekomendasi
```json
{
  "rekomendasi": {
    "diterima": boolean,
    "catatan": "string"
  },
  "pemohon": {
    "nama": "string",
    "ttd": "string (base64 image)",
    "tanggal": "string"
  },
  "adminLSP": {
    "nama": "string",
    "ttd": "string (base64 image)",
    "tanggal": "string"
  }
}
```

## Handlebars Helpers

Template ini menggunakan helper berikut:

### `increment`
Menambahkan 1 ke nilai index (untuk nomor urut).

```handlebars
{{increment @index}}
```

### `#if` dan `#each`
Helper bawaan Handlebars untuk conditional dan looping.

```handlebars
{{#if tujuanAsesmen.sertifikasi}}checked{{/if}}

{{#each unitKompetensi}}
  <tr>
    <td>{{kodeUnit}}</td>
  </tr>
{{/each}}
```

## Tips

1. **Tanda Tangan**: Gunakan base64 encoded image untuk field `ttd` (tanda tangan)
2. **Checkbox**: Gunakan boolean `true`/`false` untuk mengatur status checkbox
3. **Array Dinamis**: Unit kompetensi dan bukti dokumen menggunakan array, bisa menambahkan sebanyak yang dibutuhkan
4. **Tujuan Asesmen**: Hanya satu yang boleh `true` (mutually exclusive)

## Contoh Convert ke PDF

Untuk convert HTML ke PDF, gunakan library seperti `puppeteer`:

```javascript
const puppeteer = require('puppeteer');
const { renderTemplate } = require('./render-template');

async function convertToPdf(data, outputPath) {
  // Render template
  const html = renderTemplate('./FR.APL.01 Template Base.html', data);
  
  // Launch browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set content
  await page.setContent(html);
  
  // Generate PDF
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });
  
  await browser.close();
}
```
