import ContactPage from "../components/pages/contact/contact";

export const metadata = {
  title: "Tomás — Contact",
  description:
    "Get in touch with Tomás, a graphic designer based in the Canary Islands. Collaborate, discuss projects, or inquire about brand strategy, art direction, and digital design services.",
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
    title: "Contact Tomás",
    description: "Get in touch with Tomás",
    siteName: "tomasml.com",
    locale: "en_US",
    images: ["https://tomasml.com/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Tomás",
    description: "Get in touch with Tomás",
    creator: "@tomasml",
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
    canonical: "https://tomasml.com/contact",
  },
};

export default async function Page() {
  const jsonLdContact = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Tomás",
    description:
      "Get in touch with Tomás, a graphic designer based in the Canary Islands. Collaborate, discuss projects, or inquire about brand strategy, art direction, and digital design services.",
    url: "https://tomasml.com/contact",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdContact),
        }}
      />

      <ContactPage />
    </>
  );
}
