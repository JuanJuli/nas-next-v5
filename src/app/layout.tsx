import { Suspense } from 'react';
import './globals.css';
import 'antd/dist/antd.css';
import NextTopLoader from 'nextjs-toploader';

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
    <html suppressHydrationWarning={true}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <NextTopLoader />
        <Suspense fallback={null}>{children}</Suspense>
        </body>
    </html>
  );
}