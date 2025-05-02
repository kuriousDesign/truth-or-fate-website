// fonts
import { Sora, Permanent_Marker, Long_Cang } from 'next/font/google';
// import GothamBook from '../public/fonts/GothamBook.otf'
import localFont from 'next/font/local'
//import Header from './Header';

// components
import Socials from './Socials';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
 
// Font files can be colocated inside of `pages`
const gothamBook = localFont({ 
  src: '../public/fonts/GothamBook.otf',
  variable: '--font-gothamBook',
  weight: '400' 
})


// font settings
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const permanentMarker = Permanent_Marker({
  subsets: ['latin'],
  variable: '--font-permanentMarker',
  weight: ['400'],
});


const longCang = Long_Cang({
  subsets: ['latin'],
  variable: '--font-longCang',
  weight: ['400'],
});


const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isScrollable, setIsScrollable] = useState(false);
  const [isSplash, setIsSplash] = useState(false);

  useEffect(() => {
    setIsScrollable(router.pathname === '/about/resume');
    setIsSplash(router.pathname === '/' || router.pathname.startsWith('/splash'));
  }, [router.pathname]);


  return (
    <div
      className={`page ${!isScrollable && 'overflow-hidden'} bg-blue-950 text-white  ${sora.variable} font-sora ${permanentMarker.variable} font-permanentMarker ${longCang.variable} font-longCang ${gothamBook.variable} font-gothamBook relative`}
    >
      <Head> {/* Add Head component here */}
        <link rel="icon" href="/logo.ico" /> {/* Replace "your-favicon.ico" with your favicon file path */}
      </Head>
      {!isSplash && (
        <>

          
          <Socials />
        </>
      )}
      
      {children}
      
    </div>
  );
};

export default Layout;

















