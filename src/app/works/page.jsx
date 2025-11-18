import WorksPage from "../components/pages/works/works";
import client from "../sanity/client";

export const metadata = {
  title: "Tomás — Works",
  description:
    "Explore Tomás’ design works. Visual creation grounded in strategy, developing functional and contemporary brand identities built with intent.",
};
export const revalidate = 60;
export default async function Page() {
  const data = await client.fetch(`
    *[_type == "works"]{
      _id,
      title,
      "slug": slug.current,
      media[] {
        alt,
        asset->{
          _id,
          url,
          mimeType
        }
      }
    }
  `);

  return <WorksPage works={data} />;
}
