import { Gist } from "@/types/ocktokit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import dayjs from "dayjs";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

export default function GistCard({ gist }: { gist: Gist }) {
  if (
    !Object.keys(gist.files)[0].split(".").at(-1) ||
    !Object.values(gist.files).at(0)?.language
  ) {
    return <></>;
  }

  return (
    <Link href={gist.id}>
      <Card className="shadow shadow-muted-foreground scale-100 duration-300 hover:shadow-md hover:scale-[1.02] hover:shadow-foreground hover:-rotate-2">
        <CardHeader className="flex-row pb-2 items-center gap-2 justify-between">
          <CardTitle>
            {Object.keys(gist.files)[0].split(".")[0]?.slice(0, 20)}
          </CardTitle>
          <CardDescription
            className="bg-secondary px-2 py-1 rounded text-foreground"
            title={Object.values(gist.files).at(0)?.language}
          >
            {Object.keys(gist.files)[0].split(".").at(-1)?.toLocaleUpperCase()}
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-0 flex justify-between">
          <small className="text-muted-foreground">
            Last updated at{" "}
            {dayjs(gist.updated_at).format("hh:mm A on MMM DD, YY")}
          </small>
          <Link
            className="p-1 text-muted-foreground bg-background hover:bg-muted-foreground/20 rounded-full hover:scale-125"
            href={gist.html_url}
            target="_blank"
          >
            <LinkIcon size={16} />
          </Link>
        </CardContent>
      </Card>
    </Link>
  );
}
