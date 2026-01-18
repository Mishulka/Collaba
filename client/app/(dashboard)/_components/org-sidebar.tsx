"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
    subsets: ["latin"],
    weight: ['600'],
})

export const OrgSidebar = () => {
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites")

    return (
        <div className="hidden lg:flex 
        flex-col space-y-6 w-[200px]
        pl-5 pt-5 h-full">
                <Link href="/">
                    <div className="flex items-center gap-x-2">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                        <span className={cn(
                            "fonts-semibold text-2xl",
                            font.className,
                        )}>
                            Board
                        </span>
                    </div>
                </Link>
                <OrganizationSwitcher
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                            },
                            organizationSwitcherTrigger: {
                                padding: "6px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #E5E7EB",
                                justifyContent: "space-between",
                            }
                        }
                    }}
                />
                <div className="space-y-1 w-full">
                    <Button
                    asChild
                    size="lg"
                    className="font-normal justify-start px-2 w-full"
                    variant={favorites ? "ghost" : "secondary"}
                    >
                        <Link href="/">
                            <LayoutDashboard />
                            Team boards
                        </Link>
                    </Button>
                    <Button
                    asChild
                    size="lg"
                    className="font-normal justify-start px-2 w-full"
                    variant={favorites ? "secondary" : "ghost"}
                    >
                        <Link href={{
                            pathname: "/",
                            query: { favorites: true }
                        }}>
                            <Star />
                            Favorite boards
                        </Link>
                    </Button>
                </div>
        </div>
    )
}