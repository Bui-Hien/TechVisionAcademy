import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import Topbar from "@/components/layout/Topbar";
import CourseSideBar from "@/components/layout/CourseSideBar";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Tech Vision Academy Overview Course",
    description: "The Tech Vision Academy Overview Course provides a comprehensive insight into our training programs, teaching methodologies, and learning opportunities. Join the course to explore the latest technology fields and understand how to develop your skills and knowledge at Tech Vision Academy.",
};


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