import {Course} from "@prisma/client";
import {clerkClient} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import {Gem} from "lucide-react";

const CourseCard = async ({course}: { course: Course }) => {
    const instructor = await clerkClient.users.getUser(course.instructorId);
    let level;
    if (course.levelId) {
        level = await db.level.findUnique({
            where: {
                id: course.levelId
            }
        })
    }
    return (
        <Link href={`/courses/${course.id}/overview`} className={"border rounded-lg cursor-pointer"}>
            <Image src={course.imageUrl ? course.imageUrl : "/image_placeholder.webp"}
                   alt={course.title}
                   width={500}
                   height={300}
                   className={"rounded-t-xl w-[320px] h-[180px] object-cover"}
            />
            <div className="px-4 py-3 flex flex-col gap-2 w-[320px]">
                <h2 className="text-lg font-bold break-words">{course.title.length > 50 ? course.title.substring(0, 50) + "..." : course.title}</h2>
                <div className="flex justify-between text-sm font-medium">
                    {instructor && (
                        <div className={"flex gap-2 items-center"}>
                            <Image src={instructor.imageUrl ? instructor.imageUrl : "/avatar_placeholder.jpg"}
                                   alt={instructor.fullName ? instructor.fullName : "Instructor photo"}
                                   width={30}
                                   height={30}
                                   className={"rounded-full"}
                            />
                            <span>{instructor.fullName}</span>
                        </div>
                    )}
                    {level && (<div className="flex gap-2">
                        <Gem size={20}/>
                        <p>{level.name}</p>
                    </div>)}
                </div>
                <p className={"text-sm font-bold"}>$ {course.price}</p>
            </div>
        </Link>
    );
};

export default CourseCard;