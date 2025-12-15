import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}

