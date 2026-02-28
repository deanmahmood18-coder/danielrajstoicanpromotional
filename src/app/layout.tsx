import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daniel-raj Stoican | Professional Boxer | Managed by Sunny Edwards",
  description:
    "Official portfolio of Daniel-raj Stoican — Amateur Record 42-8, European Champion, EM Elite Champion, 8x Regional Champion. The first European Boxing Champion from Nottinghamshire. Now turning professional, managed by Sunny Edwards.",
  keywords: [
    "Daniel-raj Stoican",
    "boxer",
    "Nottingham boxer",
    "professional boxing",
    "Sunny Edwards",
    "EM Elite Champion",
    "ABA Champion",
    "European Champion",
  ],
  openGraph: {
    title: "Daniel-raj Stoican | The Chosen One from Nottingham",
    description:
      "From the streets of Bucharest to the rings of England. Now turning professional — managed by Sunny Edwards.",
    type: "website",
  },
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
      </head>
      <body className="bg-obsidian text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
