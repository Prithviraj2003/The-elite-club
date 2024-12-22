import React, { ReactNode } from "react";
import "@/styles/tailwind.css";
import "../styles/index.css";
import "../styles/font.css";
import { Toaster } from "react-hot-toast";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>
          <Toaster position="top-right" />
          {children}
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </body>
      </html>
    </ClerkProvider>
  );
}
export default RootLayout;
