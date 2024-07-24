import React from 'react';
import {db} from "@/lib/db";
import CourseCard from "@/components/courses/CourseCard";

const SearchPage = async ({searchParams}: { searchParams: { query: string } }) => {
    const queryText = searchParams.query || "";
    const courses = await db.course.findMany({
        where: {
            isPublished: true,
            OR: [
                {title: {contains: queryText}},
                {category: {name: {contains: queryText}}},
                {subCategory: {name: {contains: queryText}}}
            ]
        },
        include: {
            category: true,
            subCategory: true,
            level: true,
            sections: {
                where: {
                    isPublished: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return (
        <div className={"px-4 py-6 md:px-10 xl:px-16"}>
            <p className={"text-lg md:text-2xl font-semibold mb-10"}>Recommended courses for {queryText}</p>
            <div className="flex flex-wrap gap-4">
                {courses.map((course) => (
                    <CourseCard course={course} key={course.id}/>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;