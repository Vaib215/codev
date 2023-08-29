"use client";
import { Button } from "@/components/ui/button";
import { runCode } from "@/lib/glot";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
const GistsList = dynamic(() => import("@/components/layouts/gist-list"), {
  ssr: false,
});

export default function Home() {
  const { status } = useSession();
  useEffect(() => {
    runCode().then((res) => console.log(res));
  }, []);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <main
        className={`flex flex-col p-24 gap-4 flex-1 items-center justify-center ${
          status === "loading" ? "animate-ping" : ""
        }`}
      >
        <h1 className="text-8xl font-thin">codev</h1>
        <h3 className="text-2xl">for the ❣️ of code</h3>
        {status === "unauthenticated" && (
          <Link href={"/api/auth/signin"}>
            <Button size={"lg"} variant={"outline"} className="text-lg">
              Get Started
            </Button>
          </Link>
        )}
      </main>
    );
  }
  return (
    <main className="flex-1 h-2/3 flex flex-col items-start px-4">
      <GistsList />
    </main>
  );
}
