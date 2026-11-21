import WorksPage from "@/components/pages/works/works";
import { getAllWorks } from "../../(utils)/sanity-queries";

export const metadata = {
  // Título e Descrição combinando branding global e busca local em espanhol
  title: "Tomás — Works & Portfolio | Designer Gráfico en Canarias",
  description:
    "Explore Tomás’ Design Works. A curated selection of branding, visual identity, and digital projects (portafolio de diseño gráfico y branding en Canarias).",

  keywords: [
    // Termos locais em Espanhol
    "designer grafico en canarias",
    "diseño gráfico canarias",
    "portafolio diseño gráfico",
    "proyectos de branding canarias",
    "diseñador gráfico canarias",
    "estudio de diseño canarias",

    // Termos globais em Inglês
    "graphic design portfolio",
    "branding projects",
    "visual identity",
    "art direction",
    "brand strategy",
    "digital design",
    "creative direction",
    "design works",
  ],

  openGraph: {
    title: "Tomás — Works & Portfolio | Designer Gráfico en Canarias",
    description:
      "A curated selection of branding, visual identity, and digital design projects by Tomás. Portafolio de diseño gráfico en Canarias.",
    siteName: "Tomás — Graphic Designer en Canarias",
    url: "https://www.tomasml.com/works",
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    images: ["https://www.tomasml.com/logo.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tomás — Works & Portfolio | Designer Gráfico en Canarias",
    description:
      "Explore selected branding, visual identity, and digital projects by Tomás (Diseño Gráfico en Canarias).",
    creator: "@tomasml",
    images: ["https://www.tomasml.com/logo.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.tomasml.com/works",
  },
};

export const revalidate = 86400;

export default async function Page() {
  const works = await getAllWorks();

  const jsonLdCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tomás — Works & Portfolio",
    description:
      "A curated selection of branding and visual identity works (diseño gráfico y branding en Canarias) by Tomás.",
    url: "https://www.tomasml.com/works",
    inLanguage: ["en", "es"],
    provider: {
      "@type": "ProfessionalService",
      name: "Tomás — Graphic Designer",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Canarias",
        addressCountry: "ES",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: works?.map((work, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.tomasml.com/works/${work.slug?.current}`,
        name: work.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection),
        }}
      />
      <main>
        {/* Headings invisíveis (sr-only) otimizados para rastreamento de SEO */}
        <h1 className="sr-only">
          Tomás — Design Works & Portafolio de Diseño Gráfico en Canarias
        </h1>
        <h2 className="sr-only">
          Branding, Visual Identity, Branding & Digital Projects en Canarias
        </h2>
        <WorksPage works={works} />
      </main>
    </>
  );
}
