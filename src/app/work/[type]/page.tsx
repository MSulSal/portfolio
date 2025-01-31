import WorkSlides from "@/components/WorkSlides";
import data from "@/data/workData";
import { ProjectCategory } from "@/types";

export async function generateStaticParams() {
  return Object.keys(data).map((type) => ({
    type: type as keyof ProjectCategory,
  }));
}

// Define proper type for params Promise
type ParamsPromise = Promise<{
  type: keyof ProjectCategory;
}>;

export default async function WorkTypePage({
  params,
}: {
  params: ParamsPromise;
}) {
  // Properly await the params promise
  const resolvedParams = await params;
  const projects = data[resolvedParams.type];

  return <WorkSlides projects={projects} />;
}
