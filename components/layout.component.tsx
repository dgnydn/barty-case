import Head from "next/head";
import { DM_Sans } from "@next/font/google";
import React from "react";

const font = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function LayoutComponent({ children }: any) {
  return (
    <>
      <Head>
        <title>Barty Case</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={font.className}>{children}</main>
    </>
  );
}