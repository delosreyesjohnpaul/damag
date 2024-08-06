"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { updateUsername } from "../actions";
import { SubmitButton } from "./SubmitButtons";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
    message: "",
    status: "",
};

export function SettingsForm({
    username,
    firstName,
    lastName,
}: {
    username: string | null | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
}) {
    const [state, formAction] = useFormState(updateUsername, initialState);
    const { toast } = useToast();
    const { pending } = useFormStatus();

    useEffect(() => {
        if (state?.status === "green") {
            toast({
                title: "Successful",
                description: state.message,
            });
        } else if (state?.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [state, toast]);
   
    
    return (
        <form action={formAction}>
            <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>

            <Separator className="my-4" />
            
            <Label className="text-lg">Username</Label>
            <p className="text-muted-foreground">In this Settings Page you can change your Username!</p>
            <Input defaultValue={username ?? undefined} name="username" required className="mt-2 mb-7" minLength={3} maxLength={21} />
            
            <Label className="text-lg mt-4">First Name</Label>
            <Input defaultValue={firstName ?? undefined} name="firstName" required className="mt-2 mb-7" minLength={1} maxLength={50} />

            <Label className="text-lg mt-4">Last Name</Label>
            <Input defaultValue={lastName ?? undefined} name="lastName" required className="mt-2 mb-7" minLength={1} maxLength={50} />

            {state?.status === "error" && (<p className="text-red-500 mt-1">{state.message}</p>)}

            <div className="w-full flex mt-5 gap-x-5 justify-end">
                <Button variant="secondary" asChild type="button">
                    <Link href="/">Cancel</Link>
                </Button>
                <SubmitButton text="Save Changes" isSubmitting={pending} />
            </div>
        </form>
    );
}
