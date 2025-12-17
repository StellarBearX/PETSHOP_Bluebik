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
