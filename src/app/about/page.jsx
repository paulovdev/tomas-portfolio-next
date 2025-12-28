import AboutPage from "../components/pages/about/about";

export const metadata = {
  title: "Tomás — About",
  description:
    "Learn more about Tomás, a designer focused on building brands with intention, purpose, and a clear voice. Experienced in brand strategy, art direction, and digital design creation.",
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
