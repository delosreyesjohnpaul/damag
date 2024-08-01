import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BlindsIcon, BookPlusIcon, FilePlus2, FileUp, HomeIcon, LogOutIcon, MenuIcon, TrendingUp, TrendingUpIcon, User2Icon, UserCircle, Users } from "lucide-react";
import Link from "next/link";
import {LogoutLink} from '@kinde-oss/kinde-auth-nextjs/components'
import community from "../../public/users-four.svg"
import Image from "next/image";


interface iAppProps{
    userImage: string | null;
}

export function UserDropdown({userImage}: iAppProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5"/>

                    <img src={userImage ??
                    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
                    alt="avatar of the user" 
                    className="rounded-full h-8 w-8 hidden lg:block"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
            
                <div className="w-[200px] flex items-center gap-x-4">
                        <DropdownMenuItem>
                            <HomeIcon className="h-5 w-5 lg mr-2"/>
                            <Link className="w-[145px]" href="/">
                                Home
                            </Link>
                        </DropdownMenuItem>
                </div>

                <div className="flex items-center gap-x-4">
                        <DropdownMenuItem>
                        <TrendingUpIcon className="h-5 w-5 lg mr-2"/>
                            <Link className="w-[145px]" href="/trending">
                                Trending
                            </Link>
                        </DropdownMenuItem>
                </div>

                <div className="flex items-center gap-x-4">
                        <DropdownMenuItem>
                            <Users className="h-5 w-5 lg mr-2"/>
                            <Link className="w-[145px]" href="/community">
                            Community
                            </Link>
                        </DropdownMenuItem>
                </div>
                <DropdownMenuItem>
                    <BlindsIcon className="h-5 w-5 lg mr-2"/>
                    <Link className="w-[145px]" href="/r/create">
                    Create Community
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <FilePlus2 className="h-5 w-5 lg mr-2"/>
                    <Link className="w-[145px]" href="/r/Home/create">
                    Create Post
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <UserCircle className="h-5 w-5 lg mr-2"/>
                    <Link className="w-[145px]" href="/settings">
                    Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <LogOutIcon  className="h-5 w-5 lg mr-2"/>
                    <LogoutLink className="w-[145px]">Logout</LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
