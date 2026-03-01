import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://danielrajstoican.com";

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Daniel-raj Stoican | Professional Boxer | European Champion | Managed by Sunny Edwards",
    template: "%s | Daniel-raj Stoican",
  },
  description:
    "Official site of Daniel-raj Stoican — European Champion, ABA National Champion, Elite Boxer of the Tournament. Amateur record 42-8 from 50 bouts. The first European Boxing Champion from Nottinghamshire. Now turning professional, managed by former IBF World Champion Sunny Edwards.",
  keywords: [
    "Daniel-raj Stoican",
    "Daniel Raj Stoican",
    "Daniel Stoican boxer",
    "Nottingham boxer",
    "professional boxer Nottingham",
    "European Boxing Champion",
    "European Champion boxing",
    "ABA National Champion",
    "Sunny Edwards boxer",
    "Sunny Edwards management",
    "amateur boxing UK",
    "Romanian British boxer",
    "Nottinghamshire boxing",
    "super welterweight",
    "boxing prospect UK",
    "Elite Boxer of the Tournament",
  ],
  authors: [{ name: "Daniel-raj Stoican" }],
  creator: "DM Developers",
  publisher: "Daniel-raj Stoican",
  formatDetection: {
    telephone: true,
    email: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Daniel-raj Stoican | European Champion | Professional Boxer",
    description:
      "From the streets of Bucharest to European Champion. Amateur record 42-8. The first European Boxing Champion from Nottinghamshire. Now turning professional — managed by Sunny Edwards.",
    url: siteUrl,
    siteName: "Daniel-raj Stoican",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/media/landing_photo.JPG",
        width: 1200,
        height: 630,
        alt: "Daniel-raj Stoican — European Champion & Professional Boxer from Nottingham",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel-raj Stoican | European Champion | Professional Boxer",
    description:
      "From the streets of Bucharest to European Champion. The first from Nottinghamshire. Now turning professional.",
    images: ["/media/landing_photo.JPG"],
  },
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  category: "sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  name: "Daniel-raj Stoican",
                  alternateName: ["Daniel Raj Stoican", "Daniel Stoican"],
                  description:
                    "European Boxing Champion and ABA National Champion from Nottingham, England. Amateur record 42-8. The first European Champion from Nottinghamshire.",
                  url: siteUrl,
                  image: `${siteUrl}/media/landing_photo.JPG`,
                  birthPlace: {
                    "@type": "Place",
                    name: "Bucharest, Romania",
                  },
                  birthDate: "2004",
                  nationality: [
                    { "@type": "Country", name: "Romania" },
                    { "@type": "Country", name: "United Kingdom" },
                  ],
                  homeLocation: {
                    "@type": "Place",
                    name: "Nottingham, England",
                  },
                  jobTitle: "Professional Boxer",
                  sport: "Boxing",
                  weight: {
                    "@type": "QuantitativeValue",
                    value: 154,
                    unitCode: "LBR",
                  },
                  height: {
                    "@type": "QuantitativeValue",
                    value: "6'0\"",
                  },
                  award: [
                    "European Boxing Champion 2025",
                    "ABA National Champion",
                    "Elite Boxer of the Tournament (757 boxers)",
                    "8x Regional Champion",
                    "Tri-Nations Silver Medallist",
                    "Haringey Box Cup Gold Medallist",
                  ],
                  sameAs: [
                    "https://www.instagram.com/daniel_rajstoican",
                    "https://www.tiktok.com/@dstoicanraj",
                  ],
                  knowsAbout: ["Boxing", "Super Welterweight Boxing"],
                  memberOf: {
                    "@type": "SportsTeam",
                    name: "Sneinton ABC",
                    sport: "Boxing",
                    location: {
                      "@type": "Place",
                      name: "Nottingham, England",
                    },
                  },
                  agent: {
                    "@type": "Person",
                    name: "Sunny Edwards",
                    description: "Former IBF World Flyweight Champion",
                    jobTitle: "Boxing Manager",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Daniel-raj Stoican — Professional Boxer",
                  description:
                    "Official website of Daniel-raj Stoican, European Boxing Champion from Nottingham.",
                  publisher: { "@id": `${siteUrl}/#person` },
                  inLanguage: "en-GB",
                },
                {
                  "@type": "WebPage",
                  "@id": `${siteUrl}/#webpage`,
                  url: siteUrl,
                  name: "Daniel-raj Stoican | Professional Boxer | European Champion",
                  isPartOf: { "@id": `${siteUrl}/#website` },
                  about: { "@id": `${siteUrl}/#person` },
                  description:
                    "Official portfolio of Daniel-raj Stoican — European Champion, ABA National Champion, amateur record 42-8. Managed by Sunny Edwards.",
                  inLanguage: "en-GB",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-obsidian text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
