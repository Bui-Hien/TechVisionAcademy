import {db} from "@/lib/db";
import {Course} from "@prisma/client";

const getCoursesByCategory = async (categoryId: string | null): Promise<Course[]> => {
    // Define the where clause for the query
    const whereClause: any = {
        ...(categoryId ? {categoryId, isPublished: true} : {isPublished: true}),
    };

    // Fetch courses from the database
    const courses = await db.course.findMany({
        where: whereClause,
        include: {
            subCategory: true,
            category: true,
            level: true,
            sections: {
                where: {
                    isPublished: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Return the fetched courses
    return courses;
};

export default getCoursesByCategory;
