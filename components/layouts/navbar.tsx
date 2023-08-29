"use client";
import { CalendarDays, LogIn, LogOut, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import ThemeBtn from "../util/theme-toggle";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import dayjs from "dayjs";
import IconBtnLoader from "../loaders/icon-button-loader";

export default function NavBar() {
  const { status, data } = useSession();
  return (
    <nav className="flex justify-between p-4 sticky top-0 z-100 bg-background/50 backdrop-blur-sm">
      <h1 className="text-2xl font-bold">
        <Link href={"/"}>codev</Link>
      </h1>
      <div className="flex gap-4 items-center">
        {status === "authenticated" && (
          <>
            <HoverCard>
              <HoverCardTrigger asChild className="p-0">
                <Button variant="link">@{data.user.profile.login}</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-black ml-4 p-4 rounded-lg border">
                <div className="flex justify-between items-start space-x-4">
                  <Avatar className="w-32 aspect-square rounded-xl overflow-hidden">
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
                        {dayjs(data.user.profile.created_at).format(
                          "MMMM, YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <Link href={"/api/auth/signout"}>
              <Button
                className="flex gap-2 items-center"
                variant={"destructive"}
                size={"default"}
              >
                <LogOut />
                <strong>Logout</strong>
              </Button>
            </Link>
            <Link className="flex gap-2 items-center" href={"/create"}>
              <Button size={"icon"} variant={"secondary"} className="text-lg">
                <Plus />
              </Button>
            </Link>
          </>
        )}
        {status === "unauthenticated" && (
          <Link href={"/api/auth/signin"}>
            <Button
              className="flex gap-2 items-center"
              variant={"secondary"}
              size={"default"}
            >
              <LogIn size={16} />
              <strong>Get Started</strong>
            </Button>
          </Link>
        )}
        {status === "loading" && (
          <>
            <IconBtnLoader className="w-16 h-6" />
            <IconBtnLoader className="w-28 h-10" />
            <IconBtnLoader className="w-10 h-10" />
          </>
        )}
        <ThemeBtn />
      </div>
    </nav>
  );
}
