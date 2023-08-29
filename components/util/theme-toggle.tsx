"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import IconBtnLoader from "../loaders/icon-button-loader";

export default function ThemeBtn() {
  const { theme, setTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <IconBtnLoader className="w-10 aspect-square"/>;
  }

  return (
    <Button
      size={"icon"}
      variant={"outline"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
}
