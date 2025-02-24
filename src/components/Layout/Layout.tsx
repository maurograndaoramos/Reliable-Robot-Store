import { Geist, Geist_Mono } from "next/font/google";
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
  
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
        <Header />
        <main className="max-w-7xl mx-auto p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
