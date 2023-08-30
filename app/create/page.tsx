import CreateCodevView from "@/components/layouts/create-codev";
import { getLanguages } from "@/lib/code";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create | codev",
  description: "Create a new codev that will be saved in your gists.",
};

export default async function CreatePage() {
  const languages = await getLanguages();
  return (
    <div className="flex-1 flex flex-col">
      <CreateCodevView languages={languages} />
    </div>
  );
}
