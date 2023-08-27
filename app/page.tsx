import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col p-24 gap-4 flex-1 items-center justify-center">
      <h1 className="text-8xl font-thin">codev</h1>
      <h3 className="text-2xl">for the ❣️ of code</h3>
      <Button size={"lg"} variant={"outline"} className="text-lg">Get Started</Button>
    </main>
  );
}
