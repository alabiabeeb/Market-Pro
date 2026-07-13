"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import { TrialProvider } from "./components/TrialProvider";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <TrialProvider>
      <div className="flex h-screen bg-[#F7F4EE] text-[#0A2E1A] dark:bg-[#060F09] dark:text-[#F7F4EE]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 md:pb-6 bg-[#F7F4EE]/80 md:bg-transparent dark:bg-[#08120C]/80">
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </main>
        </div>
      </div>
    </TrialProvider>
  );
}