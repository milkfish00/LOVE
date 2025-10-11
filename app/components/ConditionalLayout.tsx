"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import Banner from "./ui/Banner";


interface ConditionalLayoutProps {
  children: React.ReactNode;
  settings: any; // Pass settings as prop from server
}

export default function ConditionalLayout({
  children,
  settings,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <>
      {!isHomePage && <Banner />}
      {!isHomePage && settings && <Navbar settings={settings} />}
      {children}
      {!isHomePage && settings && <Footer settings={settings} />}
    </>
  );
}
