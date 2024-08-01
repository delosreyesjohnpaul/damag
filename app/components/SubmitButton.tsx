// SubmitButton.tsx
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
    text: string;
    disabled?: boolean;
}

export function SubmitButton({ text, disabled = false }: SubmitButtonProps) {
    return (
        <Button type="submit" disabled={disabled}>
            {text}
        </Button>
    );
}
