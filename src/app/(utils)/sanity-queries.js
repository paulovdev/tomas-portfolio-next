import client from "@/app/sanity/client";

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

export async function getAllWorks() {
  return client.fetch(
    `*[_type == "works"]
      | order(order asc){
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

export async function getHomeMedia() {
  return client.fetch(
    `*[_type == "home"][0]{ 
      "media": media | order(order asc)[]{
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
