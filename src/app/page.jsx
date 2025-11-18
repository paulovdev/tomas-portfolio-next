import HomePage from "./components/pages/home/home";
import client from "./sanity/client";

export const metadata = {
  title: "Tomás — Branding & Visual Identity Designer",
  description:
    "Hi, I’m Tomás, a graphic designer based in the Canary Islands. I specialize in brand strategy, art direction, and digital design, creating functional and contemporary identities with intent.",
};
export const revalidate = 60;
export default async function Page() {
  const data = await client.fetch(
    `
    *[_type == "home"][0]{ 
      media[]{
        alt,
        asset->{
          _id,
          url,
          mimeType
        }
      }
    }
  `,
    {
      next: { revalidate: 60 },
    }
  );

  return <HomePage media={data.media || []} />;
}
