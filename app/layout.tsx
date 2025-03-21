import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/nav/top-nav";
import { ClerkProvider } from "@clerk/nextjs";
import { VideoProvider } from "@/context/video";
import PayPalProvider from "@/context/paypal";

export const metadata: Metadata = {
  title: "Mimika - AI-Powered Short Video Generator | Create Engaging Videos",
  description: "Mimika is an AI-powered SaaS application that enables you to easily create engaging, high-quality short videos. Perfect for social media marketers, content creators, and businesses looking to boost online presence with dynamic video content. Start creating impactful videos effortlessly with Mimika today!",
};


const roboto = Roboto({
  variable: "--font-roboto",
  weight: "100",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${roboto.variable} antialiased`}>
          <VideoProvider>
            <PayPalProvider>
              <TopNav />
              {children}
            </PayPalProvider>
          </VideoProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
