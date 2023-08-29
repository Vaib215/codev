import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import MonacoEditor from "@/lib/monaco";
import { octokit } from "@/lib/octokit";
import { PlayIcon } from "lucide-react";
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
      <Tabs defaultValue="both" className="flex h-screen flex-col relative">
        <TabsList className="w-fit max-w-sm mr-auto ml-4 grid grid-cols-3 space-x-2">
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="both">Both</TabsTrigger>
          <TabsTrigger value="output">Output</TabsTrigger>
        </TabsList>
        <Button
          className="mx-auto flex gap-2 absolute right-4"
          size={"sm"}
          variant={"secondary"}
        >
          <strong>Run</strong>
          <PlayIcon size={16} />
        </Button>
        <TabsContent
          className="flex flex-wrap gap-1 p-4 data-[state=active]:z-50"
          value="code"
        >
          <MonacoEditor
            initialCode={Object.values(data.files!).at(0)?.content}
            language={Object.values(data.files!)
              .at(0)
              ?.language?.toLocaleLowerCase()}
            height="80vh"
          />
        </TabsContent>
        <TabsContent
          value="both"
          className="grid z-20 grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 px-4 gap-4 h-[75vh]"
        >
          <div className="-mt-6 mb-4 max-w-screen-md">
            <MonacoEditor
              initialCode={Object.values(data.files!).at(0)?.content}
              language={Object.values(data.files!)
                .at(0)
                ?.language?.toLocaleLowerCase()}
            />
          </div>
          <div className="flex flex-col gap-4 -mt-6">
            <Textarea
              className="border flex-1 w-full ml-auto"
              placeholder="Enter input for your code"
            />
            <Textarea
              disabled
              className="flex-1 border-foreground"
              placeholder="Output"
            />
          </div>
        </TabsContent>
        <TabsContent
          value="output"
          className="px-4 grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1 absolute w-full mt-16 inset-0 bottom-4 data-[state=active]:z-50"
        >
          <Textarea
            className="border flex-1 w-full ml-auto"
            placeholder="Enter input for your code"
          />
          <Textarea
            disabled
            className="border-foreground -z-50"
            placeholder="Output"
          />
        </TabsContent>
      </Tabs>
    );
  } catch (e: any) {
    if (e.status === 401) {
      signOut();
    } return <></>
  }
}
