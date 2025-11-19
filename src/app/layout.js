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
    type: "website",
    url: "/",
    title: "Tomás — Branding & Visual Identity Designer",
    description:
      "Visual creation grounded in strategy. I specialize in developing functional and contemporary brand identities with intent.",
    siteName: "Tomás — Branding & Visual Identity Designer",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    site: "@tomasdesign",
    title: "Tomás — Branding & Visual Identity Designer",
    description:
      "Visual creation grounded in strategy. I specialize in developing functional and contemporary brand identities with intent.",
  },

  icons: {
    icon: [
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

  themeColor: "#ffffff",

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        {" "}
        <VHFix />
        {children}
      </body>
    </html>
  );
}
