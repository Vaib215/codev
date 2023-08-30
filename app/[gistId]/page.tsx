import SingleGistView from "@/components/layouts/single-gist-view";
import { getLanguages } from "@/lib/code";
import { octokit } from "@/lib/octokit";
import { prisma } from "@/lib/prisma";
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

  const upsert = async (input: string, output: string) => {
    prisma.codev.upsert({
      create: {
        gistId: data.id!,
        input,
        output,
      },
      update: {
        input,
        output,
      },
      where: {
        gistId: data.id!,
      },
    });
  };

  const getCodev = async () => {
    const codev = await prisma.codev.findUnique({
      select: {
        input: true,
        output: true,
      },
      where: {
        gistId: data.id,
      },
    });
    return codev;
  };
  const items = await getLanguages();
  return <SingleGistView data={data} items={items} upsert={upsert} getCodev={getCodev}/>;
}
