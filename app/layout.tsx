import localFont from "next/font/local";
import "@/styles/main.css";

const inter = localFont({
  src: "./fonts/inter/variable.ttf",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
