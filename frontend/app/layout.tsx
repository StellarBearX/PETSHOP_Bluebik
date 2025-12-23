import type { Metadata } from "next";
import Navbar from "@/Components/Layout/Navbar/Navbar";
import Footer from "@/Components/Layout/Footer/Footer";
import AuthModals from "@/Components/Modals/AuthModals/AuthModals";
import ErrorBoundary from "@/Components/ErrorBoundary";
import { AppProviders } from "./providers";
import { ToastProvider } from "@/contexts/ToastContext";
import { logo } from "@/lib/images";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Meow Meow",
  description: "Pet Shop Application",
  icons: {
    icon: logo,
    shortcut: logo,
    apple: logo,
    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className={styles.body}>
        <ErrorBoundary>
          <AppProviders>
            <ToastProvider>
              <Navbar />
              {children}
              <Footer />
              <AuthModals />
            </ToastProvider>
          </AppProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}
