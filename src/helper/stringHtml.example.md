# String HTML Helper - Usage Examples

Fungsi-fungsi utility untuk menangani string HTML, khususnya dari Tiptap editor.

## Import

```typescript
import { 
  stripHtmlTags, 
  htmlToPlainText, 
  decodeHtmlEntities,
  truncateHtmlText,
  sanitizeHtml,
  extractTextFromHtml,
  removeEmptyTags
} from '@/helper/stringHtml';
```

## 1. `stripHtmlTags(html: string): string`

Menghilangkan semua tag HTML dari string.

```typescript
const html = '<p>Hello <strong>World</strong></p>';
const result = stripHtmlTags(html);
// Output: "Hello World"

const tiptapOutput = '<p>Nama: <strong>John Doe</strong><br/>Email: john@example.com</p>';
const plain = stripHtmlTags(tiptapOutput);
// Output: "Nama: John DoeEmail: john@example.com"
```

## 2. `htmlToPlainText(html: string): string`

**Fungsi utama untuk Tiptap output** - Convert HTML ke plain text dengan formatting yang baik.

```typescript
// Contoh dari database Tiptap
const tiptapHtml = `
  <p>Persyaratan:</p>
  <ul>
    <li>KTP/Identitas</li>
    <li>Ijazah terakhir</li>
    <li>Sertifikat (jika ada)</li>
  </ul>
  <p>Catatan: Dokumen harus <strong>asli</strong> atau <em>legalisir</em></p>
`;

const plainText = htmlToPlainText(tiptapHtml);
console.log(plainText);
/* Output:
Persyaratan:

• KTP/Identitas
• Ijazah terakhir
• Sertifikat (jika ada)

Catatan: Dokumen harus asli atau legalisir
*/
```

### Penggunaan di Component

```typescript
import { htmlToPlainText } from '@/helper/stringHtml';

// Di component
const RequirementCard = ({ requirement }) => {
  const plainDescription = htmlToPlainText(requirement.requirement_name);
  
  return (
    <div>
      <h3>Requirement</h3>
      <p>{plainDescription}</p>
    </div>
  );
};
```

### Penggunaan untuk Display di Tabel

```typescript
// Di column definition
{
  title: 'Requirement Name',
  dataIndex: 'requirement_name',
  render: (value: string) => {
    const plainText = htmlToPlainText(value);
    return <div className="whitespace-pre-line">{plainText}</div>;
  },
}
```

## 3. `decodeHtmlEntities(text: string): string`

Decode HTML entities seperti `&nbsp;`, `&amp;`, dll.

```typescript
const text = 'Hello&nbsp;&amp;&nbsp;Welcome&nbsp;&lt;User&gt;';
const decoded = decodeHtmlEntities(text);
// Output: "Hello & Welcome <User>"

const numericEntity = 'Price: &#8364;100 &#x20AC;50';
const result = decodeHtmlEntities(numericEntity);
// Output: "Price: €100 €50"
```

## 4. `truncateHtmlText(html: string, maxLength: number, suffix?: string): string`

Truncate HTML ke plain text dengan limit karakter.

```typescript
const longHtml = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>';

const short = truncateHtmlText(longHtml, 50);
// Output: "Lorem ipsum dolor sit amet, consectetur adipi..."

const customSuffix = truncateHtmlText(longHtml, 50, ' [...]');
// Output: "Lorem ipsum dolor sit amet, consectetur [...]"
```

### Penggunaan di Preview Card

```typescript
const PreviewCard = ({ description }) => {
  const preview = truncateHtmlText(description, 100);
  
  return (
    <div className="card">
      <p>{preview}</p>
    </div>
  );
};
```

## 5. `sanitizeHtml(html: string): string`

Sanitize HTML untuk menghilangkan script, style, dan event handlers (keamanan).

```typescript
const unsafeHtml = `
  <p onclick="alert('hack')">Click me</p>
  <script>alert('xss')</script>
  <style>body { display: none; }</style>
  <a href="javascript:alert('xss')">Link</a>
`;

const safeHtml = sanitizeHtml(unsafeHtml);
// Output: <p>Click me</p><a href="">Link</a>
```

## 6. `extractTextFromHtml(html: string): string`

Extract text menggunakan DOM Parser (lebih akurat, hanya di browser).

```typescript
// Di client component
'use client';

const ClientComponent = () => {
  const html = '<div><p>Hello</p><p>World</p></div>';
  const text = extractTextFromHtml(html);
  // Output: "Hello\nWorld"
  
  return <div>{text}</div>;
};
```

**Note**: Fungsi ini otomatis fallback ke `htmlToPlainText()` jika dijalankan di server-side.

## 7. `removeEmptyTags(html: string): string`

Remove empty HTML tags dari string.

```typescript
const html = '<p>Text</p><p></p><div></div><p>More text</p><span>&nbsp;</span>';
const cleaned = removeEmptyTags(html);
// Output: "<p>Text</p><p>More text</p>"
```

## Real-World Examples

### Example 1: Display Requirement Name dari Database

```typescript
import { htmlToPlainText } from '@/helper/stringHtml';

// Data dari API
const requirement = {
  requirement_id: '123',
  requirement_name: '<p><strong>Fotocopy KTP</strong></p><p>Wajib dilampirkan saat pendaftaran</p>',
};

// Convert to plain text
const displayName = htmlToPlainText(requirement.requirement_name);
console.log(displayName);
/* Output:
Fotocopy KTP

Wajib dilampirkan saat pendaftaran
*/
```

### Example 2: Clean Data untuk Export CSV

```typescript
import { htmlToPlainText } from '@/helper/stringHtml';

const exportData = requirements.map(req => ({
  id: req.requirement_id,
  name: htmlToPlainText(req.requirement_name),
  category: req.requirement_category,
}));
```

### Example 3: Display di Antd Table

```typescript
import { htmlToPlainText } from '@/helper/stringHtml';
import type { TableColumnsType } from 'antd';

const columns: TableColumnsType<any> = [
  {
    title: 'Requirement',
    dataIndex: 'requirement_name',
    render: (value: string) => {
      const plainText = htmlToPlainText(value);
      return (
        <div 
          className="whitespace-pre-line" 
          title={plainText}
        >
          {plainText}
        </div>
      );
    },
  },
];
```

### Example 4: Search/Filter dengan Plain Text

```typescript
import { htmlToPlainText } from '@/helper/stringHtml';

const searchRequirements = (data: any[], searchTerm: string) => {
  return data.filter(item => {
    const plainText = htmlToPlainText(item.requirement_name).toLowerCase();
    return plainText.includes(searchTerm.toLowerCase());
  });
};
```

### Example 5: Generate PDF Payload

```typescript
import { htmlToPlainText } from '@/helper/stringHtml';

const payload = {
  buktiPersyaratanDasar: requirements.map((req, index) => ({
    no: index + 1,
    namaDokumen: htmlToPlainText(req.requirement_name), // Clean HTML untuk PDF
    memenuhi: status === 'meets',
    tidakMemenuhi: status === 'not_meets',
    tidakAda: status === 'not_exists',
  })),
};
```

## Tips

1. **Untuk display di UI**: Gunakan `htmlToPlainText()` - format paling bagus dengan newlines
2. **Untuk export (CSV/Excel)**: Gunakan `htmlToPlainText()` - clean dan readable
3. **Untuk preview singkat**: Gunakan `truncateHtmlText()` - dengan limit karakter
4. **Untuk keamanan**: Gunakan `sanitizeHtml()` sebelum render HTML
5. **Di browser only**: Gunakan `extractTextFromHtml()` - paling akurat

## Common Tiptap HTML Patterns

Tiptap biasanya menghasilkan HTML seperti:

```html
<!-- Paragraf -->
<p>Text</p>

<!-- Bold/Strong -->
<strong>Bold text</strong>

<!-- Italic -->
<em>Italic text</em>

<!-- List -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<!-- Heading -->
<h1>Heading 1</h1>
<h2>Heading 2</h2>

<!-- Line break -->
<br />

<!-- Link -->
<a href="url">Link text</a>

<!-- Kombinasi -->
<p>Normal text with <strong>bold</strong> and <em>italic</em></p>
```

Semua pattern ini ditangani dengan baik oleh `htmlToPlainText()`.
