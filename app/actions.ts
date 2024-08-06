"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma, TypeofVote } from "@prisma/client";
import { JSONContent } from "@tiptap/react";
import { revalidatePath } from "next/cache";

export async function updateUsername(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const username = formData.get('username') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    try {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                userName: username,
                firstName: firstName,
                lastName: lastName,
            },
        });

        return {
            message: 'Successfully Updated!',
            status: 'green',
        };
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return {
                    message: 'This username is already used...',
                    status: 'error',
                };
            }
        }
        throw e;
    }
}

export async function createCommunity(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return { status: "error", message: "You must be logged in to create a community." };
    }

    try {
        const name = formData.get("name") as string;

        const data = await prisma.subreddit.create({
            data: {
                name: name,
                userId: user.id,
            },
        });

        // Redirect and return a success message
        return { status: "success", message: `Community ${data.name} created successfully!` };
        
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return { status: "error", message: "This name is already used..." };
            }
        }
        return { status: "error", message: "An unexpected error occurred..." };
    }
}



export async function updateSubDescription(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    try {
        const subName = formData.get("subName") as string;
        const description = formData.get("description") as string;

        await prisma.subreddit.update({
            where: {
                name: subName,
            },
            data: {
                description: description,
            },
        });

        return {
            status: "green",
            message: "Successfully updated...",
        };
    } catch (e) {
        return {
            status: "error",
            message: "Something went wrong... Please try again...",
        };
    }
}

export async function createPost(
    { jsonContent }: { jsonContent: JSONContent | null },
    formData: FormData
) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const title = formData.get("title") as string;
    const imageUrl = formData.get("imageUrl") as string | null;
    const subName = formData.get("subName") as string;

    const data = await prisma.post.create({
        data: {
            title: title,
            imageString: imageUrl ?? undefined,
            subName: subName,
            userId: user.id,
            textContent: jsonContent ?? undefined,
        },
    });

    return redirect(`/post/${data.id}`);
}

export async function handleVote(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const postId = formData.get("postId") as string | null;
    const commentId = formData.get("commentId") as string | null;
    const voteDirection = formData.get("voteDirection") as TypeofVote;

    let vote;
    if (postId) {
        vote = await prisma.vote.findFirst({
            where: { postId, userId: user.id },
        });
    } else if (commentId) {
        vote = await prisma.vote.findFirst({
            where: { commentId, userId: user.id },
        });
    }

    if (vote) {
        if (vote.voteType === voteDirection) {
            await prisma.vote.delete({ where: { id: vote.id } });
        } else {
            await prisma.vote.update({
                where: { id: vote.id },
                data: { voteType: voteDirection },
            });
        }
    } else {
        await prisma.vote.create({
            data: {
                voteType: voteDirection,
                userId: user.id,
                postId: postId ?? undefined,
                commentId: commentId ?? undefined,
            },
        });
    }
    return revalidatePath("/");
}


export async function createComment(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const comment = formData.get("comment") as string;
    const postId = formData.get("postId") as string;

    const data = await prisma.comment.create({
        data: {
            text: comment,
            userId: user.id,
            postId: postId,
        },
    });

    revalidatePath(`/post/${postId}`);
}


export async function handleDelete(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const postId = formData.get("postId") as string;

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (post && post.userId === user.id) {
            await prisma.post.delete({
                where: { id: postId },
            });
        }
    } catch (e) {
        throw new Error("Unable to delete post");
    }

    return revalidatePath("/");
}