import HomePage from "./components/pages/home/home";
import { getHomeMedia } from "./(utils)/sanity-queries";

export const metadata = {
  title: "Tomás — Branding & Visual Identity Designer",
  description:
    "Hi, I’m Tomás, a graphic designer based in the Canary Islands.",
};

export const revalidate = 360;

export default async function Page() {
  const data = await getHomeMedia();
  return <HomePage media={data.media || []} />;
}
