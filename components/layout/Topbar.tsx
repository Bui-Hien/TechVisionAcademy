"use client"
import {useAuth, UserButton} from "@clerk/nextjs";
import {Menu, Search} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet";
import Learning from "@/components/courses/Learning";
import axios from "axios";

interface Course {
    id: string;
    title: string;
    imageUrl: string;
    progressPercentage: number;
}

const Topbar = () => {
    const {isSignedIn} = useAuth();

    const router = useRouter();
    const pathName = usePathname();


    const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const responseData = await axios.get('/api/user');
                if (isSignedIn && responseData.status == 200) {
                    const userId = responseData.data

                    const coursesResponse = await axios.get(`/api/purchased/${userId}`);
                    const courses = coursesResponse.data || [];
                    setPurchasedCourses(courses);
                }

            } catch (err) {
                console.error("[Failed to fetch data]", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [isSignedIn]);

    const topRoutes = [
        {label: "Instructor", path: "/instructor/courses"},
    ];

    const sidebarRoutes = [
        {label: "Courses", path: "/instructor/courses"},
        {
            label: "Performance",
            path: "/instructor/performance",
        },
    ];

    const [searchInput, setSearchInput] = useState("");

    const handleSearch = () => {
        if (searchInput.trim() !== "") {
            router.push(`/search?query=${searchInput}`);
        }
        setSearchInput("");
    };

    return (
        <div className="flex justify-between items-center p-4">
            <Link href="/">
                <Image src="/logo.png" height={100} width={200} alt="logo"/>
            </Link>

            <div className="max-md:hidden w-[400px] rounded-full flex">
                <input
                    className="flex-grow bg-[#FFF8EB] rounded-l-full border-none outline-none text-sm pl-4 py-3"
                    placeholder="Search for courses"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                    className="bg-[#FDAB04] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#FDAB04]/80"
                    disabled={searchInput.trim() === ""}
                    onClick={handleSearch}
                >
                    <Search className="h-4 w-4"/>
                </button>
            </div>

            <div className="flex gap-6 items-center">
                <div className="max-sm:hidden flex gap-6">
                    {topRoutes.map((route) => (
                        <Link
                            href={route.path}
                            key={route.path}
                            className="text-sm font-medium hover:text-[#FDAB04]"
                        >
                            {route.label}
                        </Link>
                    ))}
                    <Learning purchasedCourses={purchasedCourses} loading={loading}/>
                </div>

                <div className="z-20 sm:hidden">
                    <Sheet>
                        <SheetTrigger>
                            <Menu className="w-5 h-5"/>
                        </SheetTrigger>
                        <SheetContent className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                {topRoutes.map((route) => (
                                    <Link
                                        href={route.path}
                                        key={route.path}
                                        className="text-sm font-medium hover:text-[#FDAB04]"
                                    >
                                        {route.label}
                                    </Link>
                                ))}
                            </div>

                            {pathName.startsWith("/instructor") && (
                                <div className="flex flex-col gap-4">
                                    {sidebarRoutes.map((route) => (
                                        <Link
                                            href={route.path}
                                            key={route.path}
                                            className="text-sm font-medium hover:text-[#FDAB04]"
                                        >
                                            {route.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </SheetContent>
                    </Sheet>
                </div>

                {isSignedIn ? (
                    <UserButton afterSignOutUrl="/sign-in"/>
                ) : (
                    <Link href="/sign-in">
                        <Button>Sign In</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Topbar;