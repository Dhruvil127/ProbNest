import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FounderModeProvider } from '@/context/FounderModeContext';
import { getSiteUrl } from '@/lib/site-url';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: 'ProblemBase | Discover High-Signal Problems Worth Solving',
  description:
    'A curated platform for founders and operators to discover real-world problems, evaluate market friction, and spot product opportunities faster.',
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: 'ProblemBase',
    description:
      'Discover real-world problems, learn why they happen, explore solutions, and uncover startup opportunities.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className="font-sans text-app-text">
        <FounderModeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="relative flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </FounderModeProvider>
      </body>
    </html>
  );
}
