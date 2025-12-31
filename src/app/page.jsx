import HomePage from "./components/pages/home/home";
import { getHomeMedia } from "./(utils)/sanity-queries";

export const revalidate = 360;

export const metadata = {
  title: "Tomás — Branding & Visual Identity Designer",
  description: "Hi, I’m Tomás, a Graphic Designer based in the Canary Islands.",
  keywords: [
    "graphic design",
    "brand strategy",
    "art direction",
    "visual identity",
    "branding",
    "digital design",
  ],
  openGraph: {
    url: "https://www.tomasml.com",
    title: "Tomás — Branding & Visual Identity Designer",
    description:
      "Hi, I’m Tomás, a Graphic Designer based in the Canary Islands.",
    siteName: "www.tomasml.com",
    images: ["https://www.tomasml.com/logo.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    site: "@tomasdesign",
    title: "Tomás — Branding & Visual Identity Designer",
    description:
      "Hi, I’m Tomás, a Graphic Designer based in the Canary Islands.",
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
};

export default async function Page() {
  const data = await getHomeMedia();

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tomás — Branding & Visual Identity Designer",
    url: "https://www.tomasml.com",
  };

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tomás",
    url: "https://www.tomasml.com",
    logo: "https://www.tomasml.com/logo.jpg",
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
        <HomePage media={data.media || []} />
      </main>
    </>
  );
}
