import type { Metadata } from "next";
import { Montserrat, Mr_Dafoe, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import FloatButtons from "@/components/floatButtons/floatButtons";
import Script from "next/script";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  display: 'swap',
  subsets: ['latin']
})

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
      <body className={`${montserrat.variable} ${mrDafoe.variable} ${josefinSans.variable}`}>
        {/* Script principal */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '752284203828187');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=752284203828187&ev=PageView&noscript=1"
          />
        </noscript>

        <Script defer src="https://teste.igormgoncalvs.com/script.js" data-website-id="07982236-8530-4475-97ee-09fb9b3f2b9a" strategy="beforeInteractive"/>

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
