import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Image from 'next/image'
import Link from 'next/link'

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "You&apos;re Hired, or are you?",
  description: "An AI-powered platform for preparing for mock interviews",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className} antialiased pattern`}
      >

      
        <div className='root-layout'>
          <nav>
            <Link href="/" className='flex items-center gap-2'>
              <Image src="/logo.svg" alt="logo" width={38} height={32}/>
              <h2 className='text-primary-100'>You&apos;re Hired</h2>
            </Link>
          </nav>
          {children}
        </div>
        <Toaster/>
      </body>
    </html>
  );
}
