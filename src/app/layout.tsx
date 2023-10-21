import "reflect-metadata";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import TopNav from "@/presentation/component/TopNav";
import Provider from "@/presentation/context/UserProvider";
import getAppSession from "@/presentation/utils/getAppSession";
import { redirect } from "next/navigation";

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
        <body className={`${inter.className}`}>
          <TopNav />
          {children}
        </body>
        {/* <ToastContainer position="bottom-left" theme="dark" autoClose={7000} /> */}
      </Provider>
    </html>
  );
}
