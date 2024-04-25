import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { SiteFooter } from "@/components/footer";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Rotekurve",
  description: "Copyrighted to Joshua Stieber",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster />
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
