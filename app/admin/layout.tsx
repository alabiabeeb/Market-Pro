import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";

// Remove the Inter font import and use system fonts instead

export const metadata: Metadata = {
  title: "MarketPro Dashboard",
  description: "Admin Dashboard for MarketPro",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans"> {/* Changed from inter.className to Tailwind's font-sans */}
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 md:pb-6 bg-white md:bg-transparent">
              <ThemeProvider>
                {children}
              </ThemeProvider>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}