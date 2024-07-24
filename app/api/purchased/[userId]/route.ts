//app/api/purchased/[userId]
import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";

interface Course {
    id: string;
    title: string;
    imageUrl: string;
    progressPercentage: number;
}

export const GET = async (request: NextRequest,
                          {params}: { params: { userId: string } }
) => {
    try {
        const {userId} = params;
        if (!userId) {
            return new NextResponse('User ID is required', {status: 400});
        }

        const purchasedCourses = await db.purchase.findMany({
            where: {
                customerId: userId
            },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        imageUrl: true,
                    },
                },
            },
        });
        const courses: Course[] = []; // Use the Course type

        for (const purchase of purchasedCourses) {
            const course = purchase.course;

            // Fetch published sections for each course
            const publishedSections = await db.section.findMany({
                where: {
                    courseId: course.id,
                    isPublished: true,
                },
                orderBy: {
                    position: "asc"
                }
            });

            const publishSectionIds = publishedSections.map((section) => section.id);

            // Fetch progress for each course
            const completedSections = await db.progress.count({
                where: {
                    studentId: userId,
                    sectionId: {
                        in: publishSectionIds
                    },
                    isCompleted: true,
                }
            });

            // Calculate progress percentage
            const progressPercentage = publishSectionIds.length > 0
                ? (completedSections / publishSectionIds.length) * 100
                : 0; // Avoid division by zero

            courses.push({
                id: course.id,
                title: course.title,
                imageUrl: course.imageUrl || "",
                progressPercentage
            });
        }


        return NextResponse.json(courses, {status: 200});
    } catch (error) {
        console.error("[GET /api/courses]", error);
        return new NextResponse('Internal Server Error', {status: 500});
    }
}