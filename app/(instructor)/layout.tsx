import React from 'react';
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Tech Vision Academy Instructor",
    description: "Meet the expert instructors at Tech Vision Academy who bring a wealth of knowledge and real-world experience to our training programs. Learn more about their backgrounds, areas of expertise, and the unique perspectives they bring to the classroom.",
};


const InstructorLayout = ({children}: { children: React.ReactNode }) => {
    const {userId} = auth();
    if (!userId) {
        return redirect("/sign-in");
    }

    return (
        <div className="h-full flex flex-col">
            <Topbar/>
            <div className="flex-1 flex">
                <Sidebar/>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default InstructorLayout;
