import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-mono">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
