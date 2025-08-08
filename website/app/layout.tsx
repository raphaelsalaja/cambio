import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/main.css";
import type { Metadata, Viewport } from "next";
import { opengraph } from "@/config/site";

export const metadata: Metadata = opengraph;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const inter = localFont({
  src: "./fonts/inter/variable.ttf",
});

const openrunde = localFont({
  variable: "--font-openrunde",
  src: [
    {
      path: "./fonts/openrunde/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/openrunde/medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/openrunde/semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/openrunde/bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${mono.variable} ${openrunde.variable}`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
