import { octokit } from "@/lib/octokit";
import { useEffect, useState } from "react";

export default function GistsList() {
  const [gists, setGists] = useState<any>([]);
  const initGists = async () => {
    const ok = await octokit;
    const { data } = await ok.rest.gists.list();
    setGists(data);
  };

  useEffect(() => {
    initGists();
  }, []);
  return <div>{gists.length}</div>;
}
