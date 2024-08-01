"use client";
import { useToast } from "@/components/ui/use-toast";
import { Description } from "@radix-ui/react-toast";
import { Share } from "lucide-react";
import { title } from "process";

export function CopyLink({id}: {id: string}) {
    const {toast} = useToast();
    async function copytoClipboard() {
        await navigator.clipboard.writeText(`${location.origin}/post/${id}`)
        toast({
            title: "Succes",
            description: "Link copied",
        })
    }
    return (
        <button className="flex items-center gap-x-1" onClick={copytoClipboard}>
            <Share className="h-4 w-4 text-muted-foreground"/>
            <p className="text-muted-foreground font-medium text-xs">Share</p>
        </button>
    );
}