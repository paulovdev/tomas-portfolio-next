import AboutPage from "../components/pages/about/about";

export const metadata = {
  title: "Tomás — About",
  description:
    "Learn more about Tomás, a designer focused on building brands with intention, purpose, and a clear voice. Experienced in brand strategy, art direction, and digital design creation.",
  keywords: ["design", "branding", "cartoon"],
  
  openGraph: {
    title: "Tomás",
    description:
      "Learn more about Tomás, a designer focused on building brands with intention, purpose, and a clear voice.",
    siteName: "tomasml.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomás",
    description:
      "Learn more about Tomás, a designer focused on building brands with intention, purpose, and a clear voice.",
    creator: "@tomasml",
    images: ["https://tomasml.com/logo.png"],
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
    canonical: "https://tomasml.com/about",
  },
};

export default async function Page() {
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tomás",
    url: "https://tomasml.com/about",
    sameAs: [
      "https://www.linkedin.com/in/tomasmedinaleon/",
      "https://www.behance.net/tomasml",
      "https://www.instagram.com/im_tomasml/",
    ],
    jobTitle: "Branding & Visual Identity Designer",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdPerson),
        }}
      />

      <AboutPage />
    </>
  );
}
