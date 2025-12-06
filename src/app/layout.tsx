import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BudgetBox',
  description: 'Offline-First Personal Budgeting App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* The pages (BudgetForm, Dashboard, etc.) render inside here */}
        {children}
      </body>
    </html>
  );
}