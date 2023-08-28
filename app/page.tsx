"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { CalendarDays, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";
import GistsList from "@/components/layouts/gist-list";

export default function Home() {
  const { status, data } = useSession();

  if (status === "unauthenticated") {
    return (
      <main className="flex flex-col p-24 gap-4 flex-1 items-center justify-center">
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
  } else if (status === "authenticated") {
    return (
      <main className="flex flex-col items-start px-4">
        <div className="flex items-end justify-between w-full">
          <HoverCard>
            <HoverCardTrigger asChild className="p-0">
              <Button variant="link">@{data.user.profile.login}</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-black ml-4 p-4 rounded-lg border">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src={data.user.picture} />
                  <AvatarFallback>
                    {data.user.name
                      ?.split(" ")
                      .map((i) => i[0])
                      .splice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{data.user.name}</h4>
                  <p className="text-sm">{data.user.profile.bio}</p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      {dayjs(data.user.profile.created_at).format("MMMM, YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <Link className="flex gap-2 items-center" href={"/create"}>
            <Button size={"lg"} variant={"secondary"} className="text-lg">
              <Plus />
              <p>Create codev</p>
            </Button>
          </Link>
        </div>
        <Separator className="my-2" />
        <GistsList />
      </main>
    );
  }

  return (
    <main className="flex flex-col p-24 gap-4 flex-1 items-center justify-center animate-ping">
      <h1 className="text-8xl font-thin">codev</h1>
      <h3 className="text-2xl">for the ❣️ of code</h3>
    </main>
  );
}
