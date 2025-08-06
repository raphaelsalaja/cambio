import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/main.css";

const inter = localFont({
  src: "./fonts/inter/variable.ttf",
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
      <body className={`${inter.className} ${mono.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
