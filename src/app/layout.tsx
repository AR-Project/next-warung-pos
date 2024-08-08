import "reflect-metadata";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import TopNav from "@/presentation/component/TopNav";
import Provider from "@/presentation/context/UserProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warung Point of Sale",
  description: "Warung Point of Sale",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.className} flex flex-col h-screen w-screen`}>
          <TopNav />
          {children}
          <ToastContainer
            position="bottom-left"
            theme="dark"
            autoClose={7000}
          />
        </body>
      </Provider>
    </html>
  );
}
