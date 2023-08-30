"use client";

import MonacoEditor from "@/lib/monaco";
import { Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";
import { createAndSaveGist } from "@/lib/octokit";

type Prop = {
  languages: {
    language: string;
  }[];
};

export default function CreateCodevView({ languages }: Prop) {
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("");
  const [language, setLanguage] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const router = useRouter();
  const monacoLangs: any = {
    js: "javascript",
    py: "python",
  };
  const { status } = useSession();
  if (status === "unauthenticated") {
    toast({
      title: "Unauthorized",
      description: "Please login first",
    });
    router.push("/api/auth/signin");
    return <></>;
  }

  const saveFile = async () => {
    const gistId = createAndSaveGist(filename, language!, code);
    router.push("/" + gistId);
  };
  return (
    <>
      <div className="flex m-2 gap-4">
        <Input
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="filename (without extension)"
        />
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a Lang." />
          </SelectTrigger>
          <SelectContent className="h-72 overflow-y-auto">
            {languages.map((item, index) => (
              <SelectItem key={index} value={item.language}>
                {item.language.slice(0, 1).toLocaleUpperCase() +
                  item.language.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={saveFile}
          variant={filename && code && language ? "default" : "secondary"}
          className="flex gap-2"
        >
          <Save size={16} />
          <strong>Save</strong>
        </Button>
      </div>
      <MonacoEditor
        code={code}
        setCode={setCode}
        language={(language && monacoLangs[language]) ?? language}
      />
    </>
  );
}
