import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NimJS UI',
    template: '%s | NimJS UI',
  },
  description:
    'Open-source UI ecosystem with tokens, reusable React components, CLI foundations, and contributor-ready governance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
