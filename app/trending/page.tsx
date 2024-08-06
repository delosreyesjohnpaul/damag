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
import { unstable_noStore as noStore } from "next/cache";

type Post = {
  id: string;
  title: string;
  textContent: string;
  imageString: string | null;
  createdAt: Date;
  Comment: { id: string }[];
  User: { userName: string | null } | null;
  subName: string | null;
  Vote: { userId: string; voteType: "UP" | "DOWN"; postId: string }[];
};

async function getData(searchParams: string) {
  noStore();
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      createdAt: true,
      textContent: true,
      id: true,
      imageString: true,
      Comment: {
        select: {
          id: true,
        },
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
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  const filteredPosts = posts.filter(post => post.Comment.length > 0 && post.Vote.length > 0);
  const sortedPosts = filteredPosts.sort((a, b) => {
    const aVotes = a.Vote.reduce((acc, vote) => {
      if (vote.voteType === "UP") return acc + 1;
      if (vote.voteType === "DOWN") return acc - 1;
      return acc;
    }, 0);

    const bVotes = b.Vote.reduce((acc, vote) => {
      if (vote.voteType === "UP") return acc + 1;
      if (vote.voteType === "DOWN") return acc - 1;
      return acc;
    }, 0);

    const aScore = aVotes + a.Comment.length;
    const bScore = bVotes + b.Comment.length;

    return bScore - aScore;
  });

  const count = sortedPosts.length;
  const paginatedPosts = sortedPosts.slice(searchParams ? (Number(searchParams) - 1) * 10 : 0, searchParams ? Number(searchParams) * 10 : 10);

  return { data: paginatedPosts as Post[], count };
}

export default function Trending({ searchParams }: { searchParams: { page: string } }) {
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
              <h1 className="font-medium pl-1">Trending</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
            "Welcome to Damag! Check in with your favorite community and stay updated on the latest trends!"
            </p>
            <Separator className="my-5" />

            <div className="flex flex-col gap-y-3">
              <Button asChild variant="secondary">
                <Link href="/r/Home/create">Create Damag</Link>
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

async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
  const { count, data } = await getData(searchParams.page);
  return (
    <>
      {data.map((post) => (
        <PostCard
          id={post.id}
          imageString={post.imageString}
          jsonContent={post.textContent}
          subName={post.subName as string}
          title={post.title}
          key={post.id}
          commentAmount={post.Comment.length}
          userName={post.User?.userName as string}
          voteCount={post.Vote.reduce((acc: number, vote) => {
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
