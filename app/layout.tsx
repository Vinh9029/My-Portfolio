// e:\MyPortfolio\my-portoflio\app\layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "AI Engineering Student Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-200 selection:bg-cyan-500 selection:text-cyan-950">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
