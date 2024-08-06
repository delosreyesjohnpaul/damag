"use client";

import { createCommunity } from "@/app/actions";
import { SubmitButton, SubmitButtons } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FormEvent } from "react";


const initialState = {
    message: "",
    status: "",
};

export default function SubredditPage() {
    const [state, formAction] = useFormState(createCommunity, initialState);
    const { toast } = useToast();
    const [name, setName] = useState("");

    useEffect(() => {
        if (state.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [state, toast]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (name.includes(" ")) {
            toast({
                title: "Error",
                description: "Community name should not contain spaces.",
                variant: "destructive",
            });
            return;
        }
        const formData = new FormData(event.currentTarget);
        formAction(formData);
    };

    return (
        <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
            <form onSubmit={handleSubmit}>
                <h1 className="text-3xl font-extrabold tracking-tight">Create Community</h1>
                <Separator className="my-4" />
                <Label className="text-lg">Name</Label>
                <p className="text-muted-foreground">Community names, including capitalization, cannot be changed and must not contain spaces.</p>
                <div className="relative mt-3">
                    <p className="absolute left-0 w-8 flex items-center justify-center h-full text-muted-foreground">
                        d/
                    </p>
                    <Input
                        name="name"
                        required
                        className="pl-6"
                        minLength={2}
                        maxLength={21}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <p className="mt-1 text-destructive">{state.message}</p>

                <div className="w-full flex mt-5 gap-x-5 justify-end">
                    <Button variant="secondary" asChild>
                        <Link href="/">
                            Cancel
                        </Link>
                    </Button>
                    <SubmitButtons text="Create Community" />
                </div>
            </form>
        </div>
    );
}