import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout/Layout";

export const metadata: Metadata = {
  title: "Reliable Robot",
  description: "I have no idea what to put in here",
  icons: {
    icon: "favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Layout>
        {children}
      </Layout>
  );
}
