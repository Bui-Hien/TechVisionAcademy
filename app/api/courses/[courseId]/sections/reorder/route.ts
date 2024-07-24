import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export const PUT = async (req: NextRequest, {params}: { params: { courseId: string } }) => {
    try {
        const {userId} = auth();
        if (!userId) {
            return new Response("Unauthorized", {status: 401});
        }
        const {list} = await req.json();
        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                instructorId: userId
            }
        })
        if (!course) {
            return new NextResponse("Course not found", {status: 404})
        }
        for (let item of list) {
            await db.section.update({
                where: {
                    id: item.id
                }, data: {
                    position: item.position
                }
            })
        }
        return new NextResponse("Reorder sections successfully", {status: 200});
    } catch (err) {
        console.log("[reoder_PUT]", err)
        return new NextResponse("Internal Server Error", {status: 500, statusText: "Internal Server Error"})
    }
}