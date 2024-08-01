import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import DefImage from "../../public/deffcommunityImage.webp";
import ranImageone from "../../public/randomcommunity1.png";
import ranImagetwo from "../../public/randomcommunity2.jpg";
import ranImagethree from "../../public/randomcommunity3.webp";
import ranImagefour from "../../public/randomcommunity4.webp";
import ranImage5 from "../../public/randomcommunity5.webp";

interface CommunityCardProps {
    name: string;
    description: string | null;
    imageString: string | null;
    postCount: number; 
}

export function CommunityCard({ name, description, imageString, postCount }: CommunityCardProps) {
    // Array of random images
    const randomImages = [ranImageone, ranImagetwo, ranImagethree, ranImagefour, ranImage5];

    // Function to randomly select an image
    const getRandomImage = () => {
        return randomImages[Math.floor(Math.random() * randomImages.length)];
    };

    return (
        <Card className="flex flex-col gap-y-4 p-4">
            <div className="relative w-full h-32">
                <Image 
                    src={imageString || getRandomImage()} 
                    alt={`Image for ${name}`} 
                    fill
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="flex flex-col gap-y-2">
                <Link href={`/r/${name}`} passHref>
                    <h2 className="text-xl font-bold text-primary">{name}</h2>
                </Link>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
                <p className="text-sm text-muted-foreground">{postCount} Posts</p>
            </div>
        </Card>
    )
}
