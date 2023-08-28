"use client";
import { LogIn, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import ThemeBtn from "../util/theme-toggle";

export default function NavBar() {
  const { status } = useSession();
  return (
    <nav className="flex justify-between p-4 sticky top-0 z-100 bg-background/50 backdrop-blur-sm">
      <h1 className="text-2xl font-bold">codev</h1>
      <div className="flex gap-4">
        {status === "authenticated" && (
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
        <ThemeBtn />
      </div>
    </nav>
  );
}
