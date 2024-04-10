import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import {neobrutalism} from '@clerk/themes';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linguify",
  description: "AI based Language Learning App",
  icons:{
  icon: './public/mascot.svg'
  }
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
      <head>
      <script src="https://beamanalytics.b-cdn.net/beam.min.js" data-token="66f6210b-4429-4250-8fdd-6e63ebd647f8" async></script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
