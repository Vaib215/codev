import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonacoEditor from "@/lib/monaco";
import { octokit } from "@/lib/octokit";
import { Metadata } from "next";
import { signOut } from "next-auth/react";

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
  try {
    const { data } = await (
      await octokit
    ).rest.gists.get({ gist_id: params.gistId });
    return (
      <Tabs defaultValue="code">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="both">Both</TabsTrigger>
          <TabsTrigger value="output">Output</TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          <MonacoEditor
            initialCode={Object.values(data.files!).at(0)?.content}
            language={Object.values(data.files!)
              .at(0)
              ?.language?.toLocaleLowerCase()}
          />
        </TabsContent>
        <TabsContent value="both"></TabsContent>
        <TabsContent value="output"></TabsContent>
      </Tabs>
    );
  } catch (e: any) {
    if (e.status === 401) {
      signOut();
    }
    return <></>;
  }
}
