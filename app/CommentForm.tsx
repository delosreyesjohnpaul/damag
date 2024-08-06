"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./components/SubmitButtons";
import { createComment } from "./actions";
import { useRef, useState } from "react";

interface iAppProps {
  postId: string;
}

export function CommentForm({ postId }: iAppProps) {
  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(ref.current!);
    const comment = formData.get("comment") as string;

    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setIsSubmitting(true);
    await createComment(formData);
    ref.current?.reset();
    setIsSubmitting(false);
    setError(null);
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit} ref={ref}>
      <input type="hidden" name="postId" value={postId} />
      <Label>Comment right here</Label>
      <Textarea
        placeholder="What are your thoughts?"
        className="w-full mt-1 mb-2"
        name="comment"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <SubmitButton text="Comment" isSubmitting={isSubmitting} />
    </form>
  );
}
