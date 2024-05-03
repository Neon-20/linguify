import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import {neobrutalism} from '@clerk/themes';
import { Toaster, toast } from 'sonner'
import { Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ExitModal from "@/components/modals/useExitModal";
import HeartsModal from "@/components/modals/useHeartsModal";
import PractiseModal from "@/components/modals/usePractiseModal";

const font = Poppins({ subsets: ["latin"], weight: ["500"] })

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
      <body className={font.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
          >
      <Toaster richColors position="bottom-right" />
        <ExitModal/>
        <HeartsModal/>
        <PractiseModal/>
        {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
