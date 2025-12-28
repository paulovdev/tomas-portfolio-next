import { DM_Sans } from "next/font/google";
import "./globals.css";
import VHFix from "./providers/VHFixer";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://tomasml.com"),

  title: "Tomás — Branding & Visual Identity Designer",
  description:
    "Visual creation grounded in strategy. Hi, I’m Tomás, a graphic designer based in the Canary Islands, specializing in brand strategy, art direction, and digital design.",

  keywords: [
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
    title: "Tomás — Branding & Visual Identity Designer",
    description:
      "Visual creation grounded in strategy. I specialize in developing functional and contemporary brand identities with intent.",
    siteName: "Tomás — Branding & Visual Identity Designer",
    locale: "en_US",
    images: ["https://tomasml.com/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tomasdesign",
    title: "Tomás — Branding & Visual Identity Designer",
    description:
      "Visual creation grounded in strategy. I specialize in developing functional and contemporary brand identities with intent.",
    images: ["https://tomasml.com/logo.jpg"],
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
      { url: "/favicon.png", type: "image/x-icon" },
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
    canonical: "https://tomasml.com",
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tomás — Branding & Visual Identity Designer",
    alternateName: "Tomás",
    url: "https://tomasml.com",
  };

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tomás",
    url: "https://tomasml.com",
    logo: "https://tomasml.com/logo.jpg",
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
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
      </head>

      <body className={`${dmSans.variable} antialiased`}>
        <VHFix />
        {children}
      </body>
    </html>
  );
}
