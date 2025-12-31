import ContactPage from "../components/pages/contact/contact";

export const metadata = {
  title: "Tomás — Contact",
  description:
    "Contact Tomás, a graphic designer based in the Canary Islands. Collaborate, discuss projects, or inquire about brand strategy, art direction, and digital design services.",
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
    title: "Tomás Contact",
    description: "Contact Tomás",
    siteName: "tomasml.com",
    locale: "en_US",
    images: ["https://www.tomasml.com/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomás Contact",
    description: "Contact Tomás",
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
    canonical: "https://www.tomasml.com/contact",
  },
};

export default function Page() {
  const jsonLdContact = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Tomás",
    description:
      "Get in touch with Tomás, a graphic designer based in the Canary Islands. Collaborate, discuss projects, or inquire about brand strategy, art direction, and digital design services.",
    url: "https://www.tomasml.com/contact",
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdContact),
        }}
      />

      <main>
        <h1 className="sr-only">
          Contact Tomás — Graphic Designer & Creative Director
        </h1>

        <h2 className="sr-only">
          Brand Strategy, Art Direction and Digital Design Inquiries
        </h2>

        <ContactPage />
      </main>
    </>
  );
}
