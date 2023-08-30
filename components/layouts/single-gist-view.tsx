"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Code, CodeResponse, Lang, runCode } from "@/lib/code";
import MonacoEditor from "@/lib/monaco";
import { components } from "@octokit/openapi-types";
import { PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  data: components["schemas"]["gist-simple"];
  items: Lang[];
  upsert: (input: string, output: string) => Promise<void>;
  getCodev: () => Promise<{
    input: string | null;
    output: string | null;
  } | null>;
};

export default function SingleGistView({
  data,
  items,
  upsert,
  getCodev,
}: Props) {
  const [code, setCode] = useState<Code>({
    language: items.find(
      (item) =>
        item.language.toLocaleLowerCase() ===
        Object.values(data.files!)[0]?.language?.toLocaleLowerCase()
    )
      ? Object.values(data.files!)[0]?.language?.toLocaleLowerCase()
      : Object.values(data.files!)[0]?.filename?.split(".").slice(-1)[0],
    code: Object.values(data.files!).at(0)?.content,
    input: "",
  });
  const [codeResponse, setCodeResponse] = useState<CodeResponse>();
  const [loading, setLoading] = useState(false);
  const executeCode = async () => {
    setLoading(true);
    const result = await runCode(code);
    setCodeResponse(result);
    setLoading(false);
    upsert(code.input ?? "", result.output ?? "");
  };

  const populateIO = async () => {
    const codev = await getCodev();
    setCode({ ...code, input: codev?.input ?? "" });
    setCodeResponse({
      output: codev?.output ?? "",
    });
  };

  useEffect(() => {
    populateIO();
  }, []);
  return (
    <Tabs defaultValue="both" className="flex h-screen flex-col relative">
      <TabsList className="w-fit max-w-sm mr-auto ml-4 grid grid-cols-3 space-x-2">
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="both">Both</TabsTrigger>
        <TabsTrigger value="output">Output</TabsTrigger>
      </TabsList>
      <div className="mx-auto flex gap-2 absolute right-4">
        <Select
          value={code?.language ?? undefined}
          onValueChange={(val) =>
            setCode({
              ...code,
              language: val,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a Lang." />
          </SelectTrigger>
          <SelectContent className="h-72 overflow-y-auto">
            {items.map((item) => (
              <SelectItem value={item.language}>
                {item.language.slice(0, 1).toLocaleUpperCase() +
                  item.language.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={executeCode}
          size={"sm"}
          variant={"secondary"}
          className="space-x-2"
        >
          <strong>Run</strong>
          <span className={loading ? "animate-spin" : "animate-pulse"}>
            <PlayIcon size={14} />
          </span>
        </Button>
      </div>
      <TabsContent
        className="flex flex-wrap gap-1 p-4 data-[state=active]:z-50"
        value="code"
      >
        <MonacoEditor
          code={code.code}
          setCode={(newCode: string) =>
            setCode({
              ...code,
              code: newCode,
            })
          }
          language={Object.values(data.files!)
            .at(0)
            ?.language?.toLocaleLowerCase()}
          height="80vh"
        />
      </TabsContent>
      <TabsContent
        value="both"
        className="grid z-20 grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 px-4 gap-4 h-[75vh]"
      >
        <div className="-mt-6 mb-4 max-w-screen-md">
          <MonacoEditor
            code={code.code}
            setCode={(newCode: string) =>
              setCode({
                ...code,
                code: newCode,
              })
            }
            language={Object.values(data.files!)
              .at(0)
              ?.language?.toLocaleLowerCase()}
          />
        </div>
        <div className="flex flex-col gap-4 -mt-6">
          <Textarea
            className="border flex-1 w-full ml-auto"
            placeholder="Enter input for your code"
            value={code.input}
            onChange={(e) =>
              setCode({
                ...code,
                input: e.target.value,
              })
            }
          />
          <Textarea
            disabled
            className="flex-1 border-foreground text-foreground"
            placeholder="Output"
            value={codeResponse?.output}
          />
        </div>
      </TabsContent>
      <TabsContent
        value="output"
        className="px-4 grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1 absolute w-full mt-16 inset-0 bottom-4 data-[state=active]:z-50"
      >
        <Textarea
          className="border flex-1 w-full ml-auto"
          placeholder="Enter input for your code"
          value={code.input}
          onChange={(e) =>
            setCode({
              ...code,
              input: e.target.value,
            })
          }
        />
        <Textarea
          disabled
          className="border-foreground -z-50 text-foreground"
          placeholder="Output"
          value={codeResponse?.output}
        />
      </TabsContent>
    </Tabs>
  );
}
