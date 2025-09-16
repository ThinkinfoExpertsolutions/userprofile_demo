import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import "./style.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebFoxShield",
  description: "Chrome extension of ai",
  twitter: {

    images: ['./Webfoxshield.png'], // Path to the image in the public directory
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
