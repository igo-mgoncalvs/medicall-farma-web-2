import type { Metadata } from "next";
import { Montserrat, Mr_Dafoe } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import FloatButtons from "@/components/floatButtons/floatButtons";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: 'swap',
  subsets: ['latin']
})

const mrDafoe = Mr_Dafoe({
  variable: "--font-mrDafoe",
  weight: "400",
  display: 'swap',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "MedicAll Farma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta name="adopt-website-id" content="a1a1c34d-1460-461f-a5b7-cc9e2e92e740" />
        <Script
          src="//tag.goadopt.io/injector.js?website_code=a1a1c34d-1460-461f-a5b7-cc9e2e92e740"
          strategy="afterInteractive"
          className="adopt-injector"
        />
        <Script
          id="TAGS"
          dangerouslySetInnerHTML={{
            __html: `gtag('event', 'conversion', {'send_to': 'AW-11054079198/KxgrCOPcv-gZEN65_5Yp'});`,
          }}
        >
        </Script>
      </head>
      <body className={`${montserrat.variable} ${mrDafoe.variable}`}>
        <div
          className="header"
        >
          <Header />
        </div>

        <div
          className="children"
        >
          {children}
        </div>

        <FloatButtons />

        <div
          className="footer"
        >
          <Footer />
        </div>
      </body>
    </html>
  );
}
