// @ts-nocheck
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider
import { Inter } from 'next/font/google';
import './ui/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Geetanjali Diagnostics',
  icons: {
    icon: "/geeta-icon.jpg"
  }
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider> {/* Wrap the entire app with ChakraProvider */}
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
