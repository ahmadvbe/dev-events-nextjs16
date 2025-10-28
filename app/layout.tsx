import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";

//  16:10 nextjs/app/layout.tsx : main entry point for ur app - antg u do here iwll be applied accross all pages and routes
//## 31:10 LAYOUTS
   // nextjs/app/layout.tsx : main layout==>starting point of our a

const schibstedGrotesk = Schibsted_Grotesk({ //1:09:40
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = { //16:30 1:08:55
  title: "DevEvent",
  description: "The Hub for Every Dev Event You Mustn't Miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body //1:10:20 fonts change   - use of these 2 fonts accross our app
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
      >
      <Navbar //1:28:45
        />

          <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
              <LightRays //1:14:00
                  raysOrigin="top-center-offset"
                  raysColor="#5dfeca"
                  raysSpeed={0.5}
                  lightSpread={0.9}
                  rayLength={1.4}
                  followMouse={true}
                  mouseInfluence={0.02}
                  noiseAmount={0.0}
                  distortion={0.01}
              />
          </div>

          <main //1:16:00 wrap the children with the main tag
            >
            {children}
          </main>
      </body>
    </html>
  );
}
