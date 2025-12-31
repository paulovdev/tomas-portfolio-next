import AboutPage from "../components/pages/about/about";

export const metadata = {
  title: "Tomás — About",
  description:
    "Learn More About Tomás, a designer focused on building brands with intention, purpose, and a clear voice. Experienced in brand strategy, art direction, and digital design creation.",
  keywords: [
    "graphic design",
    "brand strategy",
    "art direction",
    "visual identity",
    "branding",
    "digital design",
    "designer",
    "creative direction",
  ],
  openGraph: {
    title: "About Tomás",
    description:
      "Learn More About Tomás, a designer focused on building brands with intention, purpose, and a clear voice.",
    siteName: "www.tomasml.com",
    url: "https://www.tomasml.com/about",
    type: "website",
    locale: "en_US",
    images: ["https://www.tomasml.com/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Tomás",
    description:
      "Learn More About Tomás, a designer focused on building brands with intention, purpose, and a clear voice.",
    creator: "@tomasml",
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
  alternates: {
    canonical: "https://www.tomasml.com/about/",
  },
};

export default function Page() {
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tomás",
    url: "https://www.tomasml.com/about",
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
      <main>
        <AboutPage />
      </main>
    </>
  );
}
