import { Suspense } from 'react';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const themeScript = `
(function(){
  try {
    var t = JSON.parse(localStorage.getItem('theme-storage'));
    if (t?.state?.mode === 'dark') {
      document.documentElement.classList.add('dark');
      return;
    }
  } catch(e) {}
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} className={cn("font-sans", geist.variable)}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <NextTopLoader />
        <Suspense fallback={null}>{children}</Suspense>
        </body>
    </html>
  );
}