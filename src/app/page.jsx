import HomePage from "@/components/pages/home/home";
import { getHomeMedia } from "../(utils)/sanity-queries";

export const revalidate = 360;

const SITE_URL = "https://www.tomasml.com";
const OG_IMAGE = "https://www.tomasml.com/logo.jpg";

export const metadata = {
  title: {
    default: "Tomás — Branding & Visual Identity Designer",
    template: "%s | Tomás — Branding & Visual Identity Designer",
  },
  description:
    "Hi, I’m Tomás, a Graphic Designer based in the Canary Islands specializing in branding, visual identity & art direction. Diseñador gráfico en Canarias especializado en marca, identidad visual y dirección de arte.",
  keywords: [
    // Termos em Espanhol (Busca Local)
    "designer grafico en canarias",
    "diseñador gráfico canarias",
    "diseño gráfico canarias",
    "estudio de diseño canarias",
    "diseño de marca canarias",
    "identidad visual canarias",
    "diseñador gráfico las palmas",
    "branding canarias",

    // Termos em Inglês (Atuação Global/Geral)
    "graphic design",
    "brand strategy",
    "art direction",
    "visual identity",
    "branding",
    "digital design",
    "creative direction",
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      es: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    url: SITE_URL,
    title: "Tomás — Branding & Visual Identity Designer",
    description:
      "Hi, I’m Tomás, a Graphic Designer based in the Canary Islands. Diseñador gráfico en Canarias especializado en identidad visual y marca.",
    siteName: "www.tomasml.com",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Tomás — Branding & Visual Identity Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tomasdesign",
    title: "Tomás — Branding & Visual Identity Designer",
    description:
      "Hi, I’m Tomás, a Graphic Designer based in the Canary Islands. Diseñador gráfico en Canarias.",
    images: [OG_IMAGE],
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
};

export default async function Page() {
  const data = await getHomeMedia();

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tomás — Branding & Visual Identity Designer",
    url: SITE_URL,
    inLanguage: ["en", "es"],
  };

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tomás",
    url: SITE_URL,
    logo: OG_IMAGE,
    areaServed: [
      { "@type": "Place", name: "Canary Islands, Spain" },
      { "@type": "Place", name: "Islas Canarias, España" },
    ],
  };

  return (
    <>
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
      <main>
        <HomePage media={data?.media || []} />
      </main>
    </>
  );
}
