"use client";

import { Textarea } from "@/components/ui/textarea";
import { SaveButton } from "./SubmitButtons";
import { updateSubDescription } from "../actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface iAppProps{
    subName: string;
    description: string | null | undefined;

}

const initialState = {
    message: "",
    status: "",
};

export function SubDescriptionForm({description, subName}: iAppProps) {
    const [state, formAction] = useFormState(updateSubDescription, initialState);
    const {toast} = useToast();

    useEffect(() => {
        if(state.status === "green") {
            toast({
                title: "Succes",
                description: state.message,
            });
        } else if(state.status === "error") {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive"
            })
        }
    }, [state, toast]);
    return (
        <form className="mt-3" action={formAction}>
        <input type="hidden" name="subName" value={subName} />
        <Textarea placeholder="Create your custom description for your SubDamag" maxLength={130} 
        name="description"
        defaultValue={description ?? undefined}
        />
        

        <SaveButton/>
    </form>
    )
}