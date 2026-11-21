import { DM_Sans } from "next/font/google";
import "./globals.css";
import VHFix from "../providers/VHFixer";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://www.tomasml.com"),

  // Título em inglês com a palavra-chave local estratégica em espanhol integrada
  title: "Tomás — Graphic & Visual Identity Designer en Canarias",

  // Descrição em inglês mencionando explicitamente os termos chave de busca local
  description:
    "Visual creation grounded in strategy. Hi, I’m Tomás, a graphic designer (diseñador gráfico) based in the Canary Islands, specializing in brand strategy, art direction, and digital design.",

  keywords: [
    // Termos em Espanhol (Busca Local)
    "designer grafico en canarias",
    "diseñador gráfico canarias",
    "diseño gráfico canarias",
    "estudio de diseño canarias",
    "diseño de marca canarias",
    "identidad visual canarias",

    // Termos em Inglês (Atuação Global/Geral)
    "graphic design",
    "brand strategy",
    "art direction",
    "visual identity",
    "branding",
    "digital design",
    "creative direction",
  ],

  authors: [{ name: "Tomás" }],
  creator: "Tomás",
  publisher: "Tomás",

  openGraph: {
    title: "Tomás — Graphic & Visual Identity Designer en Canarias",
    description:
      "Visual creation grounded in strategy. Estudio de diseño gráfico y branding especializado en identidades visuales contemporáneas.",
    siteName: "Tomás — Graphic Designer en Canarias",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    type: "website",
    images: ["https://www.tomasml.com/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tomasdesign",
    title: "Tomás — Graphic & Visual Identity Designer en Canarias",
    description:
      "Visual creation grounded in strategy. Graphic designer and branding specialist based in the Canary Islands.",
    images: ["https://www.tomasml.com/logo.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: "https://www.tomasml.com",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tomás — Graphic Designer en Canarias",
    alternateName: ["Tomás Design", "Diseñador Gráfico Canarias"],
    url: "https://www.tomasml.com",
    inLanguage: ["en", "es"],
  };

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Tomás — Graphic Designer & Branding Specialist",
    url: "https://www.tomasml.com",
    logo: "https://www.tomasml.com/logo.jpg",
    image: "https://www.tomasml.com/logo.jpg",
    description:
      "Graphic design studio (diseño gráfico y branding) based in the Canary Islands, specializing in visual identity and art direction.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Canarias",
      addressCountry: "ES",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Canarias",
    },
    priceRange: "$$",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebsite),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdLocalBusiness),
          }}
        />
      </head>

      <body className={`${dmSans.variable} antialiased`}>
        <VHFix />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
