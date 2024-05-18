'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";
import Header from "@/components/utils/Header";
import { Provider } from "react-redux";
import { store } from "../../../store";
import Footer from "@/components/utils/Footer";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Provider store={store} >
    <Header />
      <main>{ children }</main>
    <Footer />
    </Provider>
    </>

  );
}