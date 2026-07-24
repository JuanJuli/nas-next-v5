# Sidebar Alternative

Komponen sidebar alternatif yang mendukung dua mode styling: **Antd** dan **Tailwind CSS**.

## Features

- ✅ Support Antd component mode
- ✅ Support Tailwind CSS mode  
- ✅ Collapsible sidebar
- ✅ Multi-level menu dengan submenu
- ✅ Active state tracking berdasarkan route
- ✅ Icon support
- ✅ Smooth transitions

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | `boolean` | - | Status sidebar (collapsed/expanded) |
| `variant` | `'antd' \| 'tailwind'` | `'tailwind'` | Mode styling yang digunakan |

## Usage

### Di Template Layout

```tsx
'use client';

import { Layout } from 'antd';
import SidebarAlternative from '@/components/layout/SidebarAlternative';
import Header from '@/components/layout/Header';
import { useState } from 'react';

const { Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const variant: 'antd' | 'tailwind' = 'tailwind';

  // Untuk tailwind variant, perlu margin karena menggunakan fixed positioning
  const needsMargin = variant === 'tailwind';
  const marginLeft = needsMargin ? (collapsed ? '80px' : '300px') : '0';

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <SidebarAlternative collapsed={collapsed} variant={variant} />
      
      {/* Tambahkan marginLeft untuk tailwind variant */}
      <Layout style={{ marginLeft, transition: 'margin-left 0.3s ease-in-out' }}>
        <Header collapsed={collapsed} onCollapsedChange={setCollapsed} />
        <Content style={{ background: '#fff' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
```

**Important:** Untuk `variant="tailwind"`, pastikan menambahkan `marginLeft` pada Layout wrapper agar content tidak tertutup sidebar (karena sidebar menggunakan `fixed` positioning).

### Switching Between Variants

Anda bisa dengan mudah switch antara Antd dan Tailwind melalui prop `variant`:

```tsx
// Menggunakan Tailwind CSS (pure CSS, lebih lightweight)
<SidebarAlternative collapsed={collapsed} variant="tailwind" />

// Menggunakan Antd Components (full Antd functionality)
<SidebarAlternative collapsed={collapsed} variant="antd" />
```

## Variant Comparison

### Tailwind Variant
- ✅ Pure CSS dengan Tailwind classes
- ✅ Lebih lightweight (tidak load Antd Menu component)
- ✅ Full customizable dengan Tailwind utilities
- ✅ Custom submenu expand/collapse animation
- ⚠️ Memerlukan manual handle untuk submenu state

### Antd Variant
- ✅ Menggunakan Antd Menu component
- ✅ Built-in menu behavior dari Antd
- ✅ Consistent dengan Antd design system
- ⚠️ Slightly heavier (load Antd components)

## Configuration dalam Template

Edit `src/app/(dashboard)/template.tsx`:

```tsx
// Konfigurasi sidebar:
const useAlternative = true; // true = SidebarAlternative, false = Sidebar original
const variant: 'antd' | 'tailwind' = 'tailwind'; // pilih variant
```

## Styling Customization

### Tailwind Variant
Anda bisa customize langsung di component dengan edit Tailwind classes:
- Background color: `style={{ backgroundColor: token.colorPrimary }}`
- Hover effect: `hover:bg-white/5`
- Active state: `bg-white/10 border-r-4 border-white`
- Transitions: `transition-all duration-300`

### Antd Variant
Customize melalui `menuStyles` object atau Antd theme configuration.

## Dependencies

- `lucide-react` - untuk icons (ChevronDown, ChevronRight)
- `antd` - untuk Antd variant
- `tailwindcss` - untuk Tailwind variant

## Notes

- Component ini menggunakan `useAccessRole()` hook untuk mendapatkan menu items
- Support nested menu dengan unlimited depth
- Auto sync active menu berdasarkan current pathname
- Responsive dan smooth animation untuk collapse/expand
