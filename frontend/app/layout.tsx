import type { Metadata } from "next";
import Navbar from "@/Components/Navbar";
import Footer from"@/Components/Footer"
import { AppProviders } from "./providers";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Pet Shop",
  description: "Pet Shop Application",
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
        </AppProviders>
      </body>
    </html>
  );
}
