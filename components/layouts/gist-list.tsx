"use client";
import { Gist } from "@/types/ocktokit";
import { useEffect, useState } from "react";
import GistCard from "./gist-card";
import { octokit } from "../../lib/octokit";

export default function GistsList() {
  const [gists, setGists] = useState<Gist[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await (await octokit).rest.gists.list();
      setGists(data);
    })();
  }, []);

  return (
    <div className="flex-1 p-4 my-4 mb-8 overflow-hidden overflow-y-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {gists.map((gist: Gist) => {
        return <GistCard key={gist.id} gist={gist} />;
      })}
    </div>
  );
}
