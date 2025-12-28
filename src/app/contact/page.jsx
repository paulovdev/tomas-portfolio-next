import ContactPage from "../components/pages/contact/contact";

export const metadata = {
  title: "Tomás — Contact",
  description:
    "Get in touch with Tomás, a graphic designer based in the Canary Islands. Collaborate, discuss projects, or inquire about brand strategy, art direction, and digital design services.",
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
