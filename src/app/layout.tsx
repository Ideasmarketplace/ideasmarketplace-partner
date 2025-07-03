import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/user-content";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
      <body className={twMerge(sora.className, "antialiased")}>
        <UserProvider>{children}</UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
