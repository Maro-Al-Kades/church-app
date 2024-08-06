import { Tajawal } from "next/font/google";

import "./globals.css";

import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import NextTopLoader from "nextjs-toploader";
import { Navbar } from "@/components/shared/Header/navbar";
import { ToastContainer } from "react-toastify";
import { siteConfig } from "../config/site";
import Glow from "@/components/Glow";
import "react-toastify/dist/ReactToastify.css";


export const fontSans = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // icons: {
  //   icon: "/favicon.ico",
  // },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <>
      <html suppressHydrationWarning lang="ar" dir="rtl">
        <head />
        <body
          className={clsx(
            "min-h-screen bg-background overflow-x-hidden",
            fontSans.className
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <Glow className="-top-72 left-[90%]" />
              <Glow className="-top-72 right-[90%]" />
              <main className="container mx-auto max-w-screen-2xl pt-16 px-6 flex-grow">
                <NextTopLoader color="#ffdea6" />
                <ToastContainer theme="dark" position="top-right" />
                {children}
              </main>
              <footer className="w-full flex items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                  title="nextui.org homepage"
                >
                  <span className="text-default-600">
                    تم التصميم والتطوير بواسطة
                  </span>
                  <p className="text-primary">Maro Asam</p>
                </Link>
              </footer>
            </div>
          </Providers>
        </body>
      </html>
    </>
  );
}
