import WorksPage from "../components/pages/works/works";
import { getAllWorks } from "../(utils)/sanity-queries";

export const metadata = {
  title: "Tomás — Works",
  description:
    "Explore Tomás’ design works. Visual creation grounded in strategy.",
};

export const revalidate = 86400;

export default async function Page() {
  const data = await getAllWorks();
  return <WorksPage works={data} />;
}
