import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import {neobrutalism} from '@clerk/themes';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linguify",
  description: "AI based Language Learning App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme:neobrutalism
    }}
    >
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
