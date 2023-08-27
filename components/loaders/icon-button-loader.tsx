import { Skeleton } from "../ui/skeleton";

export default function IconBtnLoader({ className }: { className?: string }) {
    return (
        <Skeleton className={className + " rounded"}/>
    )
}
