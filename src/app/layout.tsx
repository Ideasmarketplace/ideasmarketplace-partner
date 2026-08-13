import type { Metadata } from "next";
import { Sora, Zilla_Slab } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Toaster } from "sonner";
import AuthProvider from "@/context/AuthContext";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-zilla",
});

export const metadata: Metadata = {
  title: "Welcome to your dashboard",
  description: "Manage all processes",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(zillaSlab.className, "antialiased")}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster richColors position="top-right" />
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
