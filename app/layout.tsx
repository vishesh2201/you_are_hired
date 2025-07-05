"use client";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className} antialiased ${isAuthPage ? 'pattern' : 'bg-[#0B0C10]'}`}
      >
        <div className='root-layout'>
          <nav>
            <Link href="/" className='flex items-center gap-2'>
              <Image src="/logo.svg" alt="logo" width={38} height={32}/>
              <h2 className='text-primary-100'>linkedOut</h2>
            </Link>
          </nav>
          {children}
        </div>
        <Toaster/>
      </body>
    </html>
  );
}