import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const SITE_URL = "https://aivpraxi.khkzk.cz";
const TITLE = "AI v praxi 2026 — Konference KHKZK";
const DESCRIPTION =
  "Celodenní konference o umělé inteligenci a robotice v praxi. Reálné case studies, live demo robotů, Microsoft Copilot a networking. 20. května 2026, Interhotel Zlín. Pořádá Krajská hospodářská komora Zlínského kraje.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | AI v praxi 2026",
  },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI konference",
    "umělá inteligence",
    "AI v praxi",
    "konference Zlín",
    "robotika",
    "Microsoft Copilot",
    "AI pro firmy",
    "digitální transformace",
    "KHKZK",
    "Krajská hospodářská komora",
    "Zlínský kraj",
    "AI agenti",
    "strojové vidění",
    "live demo robotů",
    "case study AI",
    "Gauss Algorithmic",
    "automatizace AI",
    "2026",
  ],
  authors: [{ name: "Krajská hospodářská komora Zlínského kraje", url: "https://www.khkzk.cz" }],
  creator: "Continero Corp",
  publisher: "Krajská hospodářská komora Zlínského kraje",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: SITE_URL,
    siteName: "AI v praxi 2026",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 800,
        alt: "Konference AI v praxi 2026 — Interhotel Zlín",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hero.png"],
  },
  other: {
    "geo.region": "CZ-ZL",
    "geo.placename": "Zlín",
    "geo.position": "49.2167;17.6667",
    "ICBM": "49.2167, 17.6667",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "AI v praxi 2026",
              description: DESCRIPTION,
              startDate: "2026-05-20T08:30:00+02:00",
              endDate: "2026-05-20T15:00:00+02:00",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Interhotel Zlín",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "náměstí Práce 2512",
                  addressLocality: "Zlín",
                  postalCode: "760 01",
                  addressCountry: "CZ",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 49.2167,
                  longitude: 17.6667,
                },
              },
              image: [`${SITE_URL}/hero.png`],
              organizer: {
                "@type": "Organization",
                name: "Krajská hospodářská komora Zlínského kraje",
                url: "https://www.khkzk.cz",
                logo: `${SITE_URL}/khkzk-logo.svg`,
                sameAs: [
                  "https://www.linkedin.com/company/khkzk/",
                  "https://cs-cz.facebook.com/HospodarskaKomoraZlinskehoKraje/",
                  "https://www.youtube.com/@krajskahospodarskakomorazl4903",
                ],
              },
              performer: [
                { "@type": "Person", name: "Ing. Zdeněk Huspenina, MBA", jobTitle: "Head of AI Business Solutions", worksFor: { "@type": "Organization", name: "Blogic" } },
                { "@type": "Person", name: "Radek Štěrba", jobTitle: "Technical Specialist", worksFor: { "@type": "Organization", name: "Microsoft" } },
                { "@type": "Person", name: "David Fogl", jobTitle: "Founder", worksFor: { "@type": "Organization", name: "Continero / MingleMinds.ai" } },
                { "@type": "Person", name: "Martin Pernica", jobTitle: "CEO", worksFor: { "@type": "Organization", name: "Elixeum / Flying Rat Studio" } },
                { "@type": "Person", name: "Václav Adamec", jobTitle: "Head of Business & Marketing", worksFor: { "@type": "Organization", name: "Gauss Algorithmic" } },
                { "@type": "Person", name: "Dalibor Mráz", jobTitle: "AI Director", worksFor: { "@type": "Organization", name: "ČERNÁ.AI / Webvalley" } },
                { "@type": "Person", name: "Marek Olbert", jobTitle: "Manufacturing Systems Manager", worksFor: { "@type": "Organization", name: "Continental Barum" } },
              ],
              offers: [
                {
                  "@type": "Offer",
                  name: "Early Bird — Člen KHKZK",
                  price: "2390",
                  priceCurrency: "CZK",
                  availability: "https://schema.org/InStock",
                  validFrom: "2026-04-09",
                  validThrough: "2026-04-23",
                  url: SITE_URL,
                },
                {
                  "@type": "Offer",
                  name: "Early Bird — Nečlen",
                  price: "3390",
                  priceCurrency: "CZK",
                  availability: "https://schema.org/InStock",
                  validFrom: "2026-04-09",
                  validThrough: "2026-04-23",
                  url: SITE_URL,
                },
                {
                  "@type": "Offer",
                  name: "Standardní — Člen KHKZK",
                  price: "2890",
                  priceCurrency: "CZK",
                  availability: "https://schema.org/InStock",
                  validFrom: "2026-04-24",
                  validThrough: "2026-05-20",
                  url: SITE_URL,
                },
                {
                  "@type": "Offer",
                  name: "Standardní — Nečlen",
                  price: "3890",
                  priceCurrency: "CZK",
                  availability: "https://schema.org/InStock",
                  validFrom: "2026-04-24",
                  validThrough: "2026-05-20",
                  url: SITE_URL,
                },
              ],
              inLanguage: "cs",
              isAccessibleForFree: false,
            }),
          }}
        />
      </head>
      <body className="min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
