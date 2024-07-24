import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import Topbar from "@/components/layout/Topbar";
import CourseSideBar from "@/components/layout/CourseSideBar";

const CourseDetailsLayout = async ({children, params}: {
                                       children: React.ReactNode;
                                       params: {
                                           courseId: string
                                       }
                                   }
    ) => {
        const {userId} = auth()
        if (!userId) {
            return redirect("/sign-in");
        }
        const {courseId} = params;
        const course = await db.course.findUnique({
            where: {
                id: courseId
            },
            include: {
                sections: {
                    where: {
                        isPublished: true
                    },
                    orderBy: {
                        position: "asc"
                    }
                }
            }
        })
        if (!course) {
            return redirect("/");
        }
        return (
            <div className={"h-full flex flex-col "}>
                <Topbar/>
                <div className="flex-1 flex">
                    <CourseSideBar course={course} studentId={userId}/>
                    <div className="flex-1">{children}</div>
                </div>
            </div>
        )
            ;
    }
;

export default CourseDetailsLayout;