import HomePage from "./components/pages/home/home";
import { getHomeMedia } from "./(utils)/sanity-queries";

export const revalidate = 360;

export const metadata = {
  title: "Tomás — Branding & Visual Identity Designer",
  description: "Hi, I’m Tomás, a graphic designer based in the Canary Islands.",
  keywords: [
    "graphic design",
    "brand strategy",
    "art direction",
    "visual identity",
    "branding",
    "digital design",
    "creative direction",
  ],
  openGraph: {
    url: "https://tomasml.com",
    title: "Tomás — Branding & Visual Identity Designer",
    description:
      "Hi, I’m Tomás, a graphic designer based in the Canary Islands.",
    siteName: "tomasml.com",
    images: ["https://tomasml.com/logo.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    site: "@tomasdesign",
    title: "Tomás — Branding & Visual Identity Designer",
    description:
      "Hi, I’m Tomás, a graphic designer based in the Canary Islands.",
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
  alternates: {
    canonical: "https://tomasml.com/",
  },
};

export default async function Page() {
  const data = await getHomeMedia();

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tomás — Branding & Visual Identity Designer",
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

      <HomePage media={data.media || []} />
    </>
  );
}
