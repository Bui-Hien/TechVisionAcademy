"use client";
import Link from "next/link";
import Image from "next/image";
import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";

interface Course {
    id: string;
    title: string;
    imageUrl: string;
    progressPercentage: number;
}

interface dataProps {
    purchasedCourses: Course[];
    loading: boolean
}

const Learning = ({purchasedCourses, loading}: dataProps) => {
    return (
        <div className="flex items-start group/item relative">
            <span
                className="text-sm font-medium before:absolute before:top-5 before:w-full before:h-5 cursor-pointer">Learning</span>
            <div
                className={`border border-gray-200 flex flex-col invisible  group-hover/item:visible absolute top-10 right-0 z-20 bg-white w-auto`}>
                {purchasedCourses.length > 0 ? (
                    <>
                        {purchasedCourses.map((course, index) => (
                            <div
                                className={`border-b border-gray-200 w-auto`}
                                key={course.id}>
                                <Link href={`/courses/${course.id}/overview`} className="flex flex-row m-2">
                                    <Image
                                        src={course.imageUrl ? course.imageUrl : "/avatar_placeholder.jpg"}
                                        alt={course.title}
                                        width={64}
                                        height={64}
                                        className="object-cover h-[64px] w-[64px]"
                                    />
                                    <div className="ps-2 flex flex-col w-80">
                                        <p className={"text-base font-semibold mb"}>{course.title}</p>
                                        {course.progressPercentage === 0 ? (
                                            <Link href={`/learning`}
                                                  className={"text-base font-semibold text-[#5022c3]"}>Start
                                                learning</Link>
                                        ) : (
                                            <Progress value={course.progressPercentage} className={"mb-2"}/>)}

                                    </div>
                                </Link>
                            </div>

                        ))}
                        <Button variant={"destructive"} className={"mt-4 m-2"}>
                            <Link href={`/learning`}>Forward to my learning process</Link>
                        </Button>
                    </>
                ) : (
                    <div className={"flex justify-center"}>
                        {loading ? (
                            <div className="flex flex-row m-2 justify-start w-full">

                                <Skeleton className="h-[64px] w-[64px]"/>
                                <div className="ps-2 flex flex-col">
                                    <Skeleton className="h-5 w-40"/>
                                    <Skeleton className="h-5 w-44 mt-3"/>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col w-full m-4">
                                <h4>You are not enrolled in any courses</h4>
                                <Button variant={"destructive"} className={"mt-2"}>
                                    <Link href={`/`}>Explore Courses</Link>
                                </Button>
                            </div>

                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Learning;
