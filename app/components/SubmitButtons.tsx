"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButtons({text}: {text: string}){
    const {pending} = useFormStatus();

    return(
        <>
        {pending ? (
            <Button disabled>
                <Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                Please wait
            </Button>
        ): (
            <Button type="submit">{text}</Button>
        )}
        </>
    );
}

export function SubmitButton({ text, isSubmitting }: { text: string, isSubmitting: boolean }) {
  return (
      <>
          {isSubmitting ? (
              <Button disabled>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Please wait
              </Button>
          ) : (
              <Button type="submit">{text}</Button>
          )}
      </>
  );
}

export function SaveButton() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button className="mt-2 w-full" disabled size="sm">
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Please wait
                </Button>
            ) : (
                <Button size="sm" className="mt-2 w-full" type="submit">Save</Button>
            )}
        </>
    );
}

export function UpVote() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button variant="outline" size="icon" disabled>
                    <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
            ) : (
                <Button variant="outline" size="sm" type="submit">
                    <ThumbsUp className="h-4 w-4" />
                </Button>
            )}
        </>
    );
}

export function DownVote() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button variant="outline" size="icon" disabled>
                    <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
            ) : (
                <Button variant="outline" size="sm" type="submit">
                    <ThumbsDown className="h-4 w-4" />
                </Button>
            )}
        </>
    );
}

export function Delete() {
    const { pending } = useFormStatus();
    console.log("Pending status:", pending);

    return (
        <>
            {pending ? (
                <Button variant="outline" size="icon" disabled>
                    <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
            ) : (
                <Button variant="outline" size="sm" type="submit">
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
        </>
    );
}
