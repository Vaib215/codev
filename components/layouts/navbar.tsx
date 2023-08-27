import { Button } from "../ui/button";
import ThemeBtn from "../util/theme-toggle";
import { Plus } from "lucide-react";

export default function NavBar() {
    return (
        <nav className="flex justify-between p-4 sticky top-0 z-100 bg-background/50 backdrop-blur-sm">
            <h1 className="text-2xl font-bold">codev</h1>
            <div className="flex gap-4">
                <Button variant={"outline"} size={"icon"}>
                    <Plus />
                </Button>
                <ThemeBtn />
            </div>
        </nav>
    );
}
