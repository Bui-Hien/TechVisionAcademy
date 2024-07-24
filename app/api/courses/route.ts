import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export const POST = async (req: NextRequest) => {
    try {
        const {userId} = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const {title, categoryId, subCategoryId} = await req.json();
        const newCourse = await db.course.create({
            data: {
                title,
                subCategoryId,
                categoryId,
                instructorId: userId
            }
        })
        return NextResponse.json(newCourse, {status: 200})
    } catch (err) {
        console.log("[courses_POST]", err);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}