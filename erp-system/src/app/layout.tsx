import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/shared/Layout";

export const metadata: Metadata = {
  title: "ERP System",
  description: "A comprehensive ERP system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
