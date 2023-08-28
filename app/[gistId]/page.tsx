import MonacoEditor from "@/lib/monaco";
import { octokit } from "@/lib/octokit";

export default async function GistViewPage({
  params,
}: {
  params: { gistId: string };
}) {
  const { data } = await (
    await octokit
  ).rest.gists.get({ gist_id: params.gistId });
  
  return (
    <MonacoEditor
      initialCode={Object.values(data.files!).at(0)?.content}
      language={Object.values(data.files!).at(0)?.language?.toLocaleLowerCase()}
    />
  );
}
