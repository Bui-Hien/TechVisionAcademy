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
                className={`border border-gray-200 flex flex-col invisible  group-hover/item:visible absolute top-10 right-0 w-[300px] z-20 bg-white`}>
                {purchasedCourses.length > 0 ? (
                    <>
                        {purchasedCourses.map((course, index) => (
                            <div
                                className={`${index === purchasedCourses.length - 1 ? '' : 'border - b border-gray-200'}`}
                                key={course.id}>
                                <Link href={`/courses/${course.id}/overview`} className="flex flex-row m-2">
                                    <Image
                                        src={course.imageUrl ? course.imageUrl : "/avatar_placeholder.jpg"}
                                        alt={course.title}
                                        width={64}
                                        height={64}
                                        className="object-cover h-[64px] w-[64px]"
                                    />
                                    <div className="ps-2 flex flex-col">
                                        <h4>{course.title}</h4>
                                        <Progress value={course.progressPercentage}/>
                                    </div>
                                </Link>
                            </div>
                        ))}
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
                                <h4>Ban dang khong hoc khoa nao</h4>
                                <Button variant={"destructive"} className={"mt-2"}>
                                    <Link href={`/`}>Khám phá các khóa học</Link>
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