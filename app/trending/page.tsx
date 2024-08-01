import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "../../public/trendbanner.jpg";
import HelloImage from "../../public/herava.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { CreatePostCard } from "../components/CreatePostCard";
import prisma from "../lib/db";
import { PostCard } from "../components/PostCard";
import { SuspenseCard } from "../components/SuspenseCard";
import Pagination from "../components/Pagination";

interface SearchParams {
  page?: string;
}

async function getData(searchParams: SearchParams) {
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      take: 10,
      skip: searchParams.page ? (Number(searchParams.page) - 1) * 10 : 0,
      select: {
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,
        Comment: {
          select: {
            id: true,
          }
        },
        User: {
          select: {
            userName: true,
          },
        },
        subName: true,
        Vote: {
          select: {
            userId: true,
            voteType: true,
            postId: true,
          },
        },
        _count: {
          select: {
            Comment: true,
            Vote: true,     
          }
        },
      },
    })
  ]);

  const filteredData = data.filter(post => {
    const upvotes = post.Vote.filter(vote => vote.voteType === 'UP').length;
    const downvotes = post.Vote.filter(vote => vote.voteType === 'DOWN').length;
    const netLikes = upvotes - downvotes;

    return post._count.Comment > 0 && netLikes > 0;
  });

  filteredData.sort((a, b) => {
    const commentDifference = b._count.Comment - a._count.Comment;
    if (commentDifference !== 0) return commentDifference;

    const aUpvotes = a.Vote.filter(vote => vote.voteType === 'UP').length;
    const aDownvotes = a.Vote.filter(vote => vote.voteType === 'DOWN').length;
    const bUpvotes = b.Vote.filter(vote => vote.voteType === 'UP').length;
    const bDownvotes = b.Vote.filter(vote => vote.voteType === 'DOWN').length;

    return (bUpvotes - bDownvotes) - (aUpvotes - aDownvotes);
  });

  return { data: filteredData, count: filteredData.length };
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />
        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>

      <div className="w-[35%]">
        <Card>
          <Image src={Banner} alt="Banner" />
          <div className="p-2">
            <div className="flex items-center">
              <Image src={HelloImage} alt="Hello Image" className="w-12 h-16 -mt-4" />
              <h1 className="font-medium pl-1">Trending Today</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2 text-justify">Share your genuine self. Authenticity resonates with people and can help you stand out.</p>
            <Separator className="my-5" />

            <div className="flex flex-col gap-y-3">
              <Button asChild variant="secondary">
                <Link href="/r/Home/create">Create Post</Link>
              </Button>
              <Button asChild>
                <Link href="/r/create">Create Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

async function ShowItems({ searchParams }: { searchParams: SearchParams }) {
  const { count, data } = await getData(searchParams);
  return (
    <>
      {data.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          imageString={post.imageString}
          jsonContent={post.textContent}
          subName={post.subName as string}
          title={post.title}
          commentAmount={post.Comment.length}
          userName={post.User?.userName as string}
          voteCount={post.Vote.reduce((acc, vote) => {
            if (vote.voteType === "UP") return acc + 1;
            if (vote.voteType === "DOWN") return acc - 1;
            return acc;
          }, 0)}
        />
      ))}
      <Pagination totalPages={Math.ceil(count / 10)} />
    </>
  );
}
