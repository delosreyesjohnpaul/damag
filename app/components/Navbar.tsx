import Link from "next/link";
import damagText from "../../public/damg.svg";
import damagMobile from "../../public/logodamgfull.svg";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";
import { use } from "react";


export async function Navbar() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    return(
       <nav className="h-[10vh] w-full flex items-center border-b px5 lg:px-14 justify-between">
            <Link href="/" className="flex items-center gap-x-2">
                <Image 
                    src={damagMobile} 
                    alt="damag mobile icon" 
                    className="h-20 w-fit"
                    />
                
                <Image 
                    src={damagText} 
                    alt="damag desktop" 
                    className="h-40 w-fit hidden lg:block"
                    />
            </Link>

            <div className="flex items-center gap-x-4">
                <ThemeToggle/>
                {user ? (
                  <UserDropdown userImage={user.picture}/>
                ): (
                    <div className="flex items-center gap-x-4">
                    <Button variant="secondary" asChild>
                    <RegisterLink>Sign up</RegisterLink>
                </Button>
                <Button asChild>
                    <LoginLink>Log in</LoginLink>
                </Button>
                    </div>
                )}
              
            </div>
            
       </nav>
    )
}