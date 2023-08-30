import SingleGistView from "@/components/layouts/single-gist-view";
import { getLanguages } from "@/lib/code";
import { octokit } from "@/lib/octokit";
import { Metadata } from "next";

type Props = {
  params: { gistId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await (
    await octokit
  ).rest.gists.get({ gist_id: params.gistId });

  return {
    title: (data.files ? Object.keys(data.files).at(0) : "Error") + " | codev",
    description: data.description,
  };
}

export default async function GistViewPage({ params }: Props) {
  const { data } = await (
    await octokit
  ).rest.gists.get({ gist_id: params.gistId });
  const items = await getLanguages();
  return <SingleGistView data={data} items={items} />;
}
