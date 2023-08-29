"use client";
import { Gist } from "@/types/ocktokit";
import { useEffect, useState } from "react";
import GistCard from "./gist-card";
import { octokit } from "../../lib/octokit";
import { signOut } from "next-auth/react";
import GistCardLoader from "../loaders/gist-card-loader";

export default function GistsList() {
  const [gists, setGists] = useState<Gist[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await (await octokit).rest.gists.list();
        setGists(data);
      } catch (e: any) {
        if (e?.status === 401) {
          signOut();
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex-1 p-4 my-4 mb-8 overflow-hidden overflow-y-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {loading &&
        Array.from({ length: 15 }, (_, index) => (
          <GistCardLoader key={index} />
        ))}
      {!loading &&
        gists.map((gist: Gist) => <GistCard key={gist.id} gist={gist} />)}
    </div>
  );
}
