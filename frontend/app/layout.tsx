import type { Metadata } from "next";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import AuthModals from "@/Components/AuthModals";
import { AppProviders } from "./providers";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Meow Meow",
  description: "Pet Shop Application",
  icons: {
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/920430fbdf8e30589d118b73fe63623ac597477e",
    shortcut: "https://api.builder.io/api/v1/image/assets/TEMP/920430fbdf8e30589d118b73fe63623ac597477e",
    apple: "https://api.builder.io/api/v1/image/assets/TEMP/920430fbdf8e30589d118b73fe63623ac597477e",
    
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
        <AppProviders>
          <Navbar />
          {children}
          <Footer />
          <AuthModals />
        </AppProviders>
      </body>
    </html>
  );
}
