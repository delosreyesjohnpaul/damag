import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { SettingsForm } from "../components/SettingsForm";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
    noStore();
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            userName: true,
            firstName: true,
            lastName: true,
        },
    });

    return data;
}

export default async function SettingsPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }
    const data = await getData(user.id);
    return (
        <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
            <SettingsForm username={data?.userName} firstName={data?.firstName} lastName={data?.lastName} />
        </div>
    );
}
