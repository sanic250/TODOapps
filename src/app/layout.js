import {Josefin_Sans } from "next/font/google";
import "./globals.css";

const josefin_sans = Josefin_Sans({
  weight:["400","700"],
  subsets: ["latin"],
});



export const metadata = {
  title: "TODO APP",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin_sans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
