import Banner from "../../public/bannercoms.webp";
import HelloImage from "../../public/herava.png";
import prisma from "../lib/db";
import { CommunityCard } from "../components/CommunityCard";
import { Suspense } from "react";
import { SuspenseCard } from "../components/SuspenseCard";
import Pagination from "../components/Pagination";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CreatePostCard } from "../components/CreatePostCard";
import Link from "next/link";

async function getCommunityData(page: string) {
  const [count, communities] = await prisma.$transaction([
    prisma.subreddit.count(),
    prisma.subreddit.findMany({
      include: {
        posts: {
          select: {
            id: true,
          },
        },
      },
    }),
  ]);

  // Calculate post count and sort by it
  const sortedCommunities = communities
    .map((community) => ({
      ...community,
      postCount: community.posts.length,
    }))
    .sort((a, b) => b.postCount - a.postCount)
    .slice(page ? (Number(page) - 1) * 10 : 0, page ? Number(page) * 10 : 10);

  return { data: sortedCommunities, count };
}

export default function CommunityDamag({ searchParams }: { searchParams: { page: string } }) {
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
              <h1 className="font-medium pl-1">Community</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2 text-justify">Welcome to Damag! Explore, connect, and discover everything our vibrant community has to offer.</p>
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

async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
  const { data, count } = await getCommunityData(searchParams.page);

  return (
    <>
      {data.map((community) => (
        <CommunityCard
          key={community.name}
          name={community.name}
          description={community.description}
          imageString={community.imageString}
          postCount={community.postCount}
        />
      ))}
      <Pagination totalPages={Math.ceil(count / 10)} />
    </>
  );
}
