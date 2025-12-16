import type { Metadata } from "next";
import Navbar from "@/Components/Navbar";
import Footer from"@/Components/Footer"
import "./globals.css";

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
      <body className="bg-[#F5F5F5]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
