import client from "@/app/sanity/client";

/* -----------------------------------------
   BUSCA 1 — Work específico (/works/[slug])
------------------------------------------ */
export async function getWork(slug) {
  return client.fetch(
    `*[_type == "works" && slug.current == $slug][0]{
      title,
      description,
      year,
      website,
      client,
      services,
      "slug": slug.current,
      media[] {
        alt,
        asset->{
          _id,
          url,
          mimeType
        }
      }
    }`,
    { slug },
    {
      cache: "force-cache",
      next: { tags: ["works", `work-${slug}`] },
    }
  );
}

/* -----------------------------------------
   BUSCA 2 — Related Works
------------------------------------------ */
export async function getRelatedWorks(slug) {
  return client.fetch(
    `*[_type == "works" && slug.current != $slug]
      | order(year desc)[0...3]{
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
      }`,
    { slug },
    {
      cache: "force-cache",
      next: { tags: ["works"] },
    }
  );
}

/* -----------------------------------------
   BUSCA 3 — Work list (/works)
------------------------------------------ */
export async function getAllWorks() {
  return client.fetch(
    `*[_type == "works"]{
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
    }`,
    {},
    {
      cache: "force-cache",
      next: { tags: ["works"] },
    }
  );
}

/* -----------------------------------------
   BUSCA 4 — Home media (/)
------------------------------------------ */
export async function getHomeMedia() {
  return client.fetch(
    `*[_type == "home"][0]{ 
      media[] {
        alt,
        asset->{
          _id,
          url,
          mimeType
        }
      }
    }`,
    {},
    {
      cache: "force-cache",
      next: { tags: ["home"] },
    }
  );
}
