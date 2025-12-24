import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import './globals.css';
import { Web3Provider } from './context/Web3Context';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Jharkhand Tourism",
  description: "Explore the beautiful state of Jharkhand",
  icons: {
    icon: [
      { url: "/images/favicon.png", type: "image/png" },
      // { url: "/images/newlogo.png", type: "image/png", sizes: "32x32" }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <Web3Provider>
          {children}
        </Web3Provider>
        <Analytics />
      </body>
    </html>
  );
}
