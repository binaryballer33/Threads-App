import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";

export const metadata: Metadata = {
  title: "Threads Clone",
  description: "A Next JS 14 Meta Threads Application",
};

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full flex justify-center items-center min-h-screen">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
