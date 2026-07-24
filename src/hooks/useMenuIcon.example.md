# useMenuIcon Hook

Hook utilities untuk bekerja dengan menu icons di aplikasi.

## Available Hooks

### 1. `useMenuIcon(aliasName?: string)`
Mendapatkan icon berdasarkan alias name.

**Parameter:**
- `aliasName` - Nama alias icon (contoh: `'dashboard'`, `'user'`, `'calendar'`)

**Returns:**
- `React.ReactNode` - Icon component atau `undefined` jika tidak ditemukan

**Example:**
```tsx
import { useMenuIcon } from '@/hooks/useMenuIcon';

function MyComponent() {
  const dashboardIcon = useMenuIcon('dashboard');
  const userIcon = useMenuIcon('user');
  
  return (
    <div>
      <span>{dashboardIcon}</span>
      <span>{userIcon}</span>
    </div>
  );
}
```

---

### 2. `useMenuIcons(aliasNames: string[])`
Mendapatkan multiple icons sekaligus berdasarkan array alias names.

**Parameter:**
- `aliasNames` - Array nama alias icons

**Returns:**
- `React.ReactNode[]` - Array of icon components

**Example:**
```tsx
import { useMenuIcons } from '@/hooks/useMenuIcon';

function IconList() {
  const icons = useMenuIcons(['dashboard', 'user', 'calendar', 'setting']);
  
  return (
    <div className="flex gap-2">
      {icons.map((icon, index) => (
        <span key={index}>{icon}</span>
      ))}
    </div>
  );
}
```

---

### 3. `useAllMenuIcons()`
Mendapatkan semua available icon aliases.

**Returns:**
- `IMenuAliases` - Object berisi semua icon aliases

**Example:**
```tsx
import { useAllMenuIcons } from '@/hooks/useMenuIcon';

function AllIconsPreview() {
  const allIcons = useAllMenuIcons();
  
  return (
    <div className="grid grid-cols-4 gap-4">
      {Object.entries(allIcons).map(([key, icon]) => (
        <div key={key} className="flex items-center gap-2">
          <span>{icon}</span>
          <span className="text-sm">{key}</span>
        </div>
      ))}
    </div>
  );
}
```

---

### 4. `useHasMenuIcon(aliasName?: string)`
Check apakah icon alias exists.

**Parameter:**
- `aliasName` - Nama alias icon untuk dicek

**Returns:**
- `boolean` - `true` jika icon exists

**Example:**
```tsx
import { useHasMenuIcon, useMenuIcon } from '@/hooks/useMenuIcon';

function ConditionalIcon({ iconName }: { iconName: string }) {
  const hasIcon = useHasMenuIcon(iconName);
  const icon = useMenuIcon(iconName);
  
  if (!hasIcon) {
    return <span>Icon not found</span>;
  }
  
  return <span>{icon}</span>;
}
```

---

### 5. `useMenuIconByPath(pathname: string)` ⭐
**Hook utama yang mencari icon dari menu structure berdasarkan pathname.**

Automatically mencari menu item yang match dengan pathname (menggunakan longest match algorithm) dan return icon yang sesuai.

**Parameter:**
- `pathname` - Path URL (contoh: `'/dashboard'`, `'/users/list'`)

**Returns:**
- `React.ReactNode` - Icon component atau `undefined` jika tidak ditemukan

**Example:**
```tsx
import { usePathname } from 'next/navigation';
import { useMenuIconByPath } from '@/hooks/useMenuIcon';

function PageHeader() {
  const pathname = usePathname();
  const pageIcon = useMenuIconByPath(pathname);
  
  return (
    <div className="flex items-center gap-2">
      <span>{pageIcon}</span>
      <h1>Current Page</h1>
    </div>
  );
}
```

**Advanced Example:**
```tsx
'use client';

import { usePathname } from 'next/navigation';
import { useMenuIconByPath } from '@/hooks/useMenuIcon';

export function Breadcrumb() {
  const pathname = usePathname();
  const icon = useMenuIconByPath(pathname);
  
  return (
    <nav className="flex items-center gap-2">
      {icon && <span className="text-primary">{icon}</span>}
      <span className="text-gray-600">{pathname}</span>
    </nav>
  );
}
```

---

## Available Icon Aliases

Lihat file `src/components/ui/menuAlias.tsx` untuk daftar lengkap icon aliases yang tersedia, termasuk:

- `dashboard`, `user`, `calendar`, `menu`, `schedule`, `setting`, `team`
- `role`, `lsp`, `building`, `locate_building`, `start`, `schema`, `diagram`
- `files`, `scheme`, `file_history`, `survey`, `user_check`, `user_pencil`
- `code`, `letter_category`, `folder_cat`, `portfolio`, `history`
- `folder`, `fileText`, `group`, `mail`, `form_outlined`
- `video_outline`, `pie_chart`, `file_upload`, `file_download`
- dan lainnya...

---

## Performance

Semua hooks menggunakan `useMemo` untuk optimization, sehingga icon components tidak di-recreate pada setiap render kecuali dependencies berubah.

## Type Safety

Semua hooks fully typed dengan TypeScript untuk better developer experience dan type safety.
