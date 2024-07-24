import SectionsDetails from "@/components/sections/SectionsDetails";
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";
import {Resource} from "@prisma/client";
import {redirect} from "next/navigation";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Section Detail Course',
    description: 'Explore the detailed content of each section in our course. This includes an overview of the topics covered, learning objectives, and the key skills you will gain by completing the section. Get a clear understanding of what to expect and how each part contributes to your overall learning journey.',
};

const SectionDetailsPage = async ({
                                      params,
                                  }: {
    params: { courseId: string; sectionId: string };
}) => {
    const {courseId, sectionId} = params;
    const {userId} = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId,
            isPublished: true,
        },
        include: {
            sections: {
                where: {
                    isPublished: true,
                },
            },
        },
    });

    if (!course) {
        return redirect("/");
    }

    const section = await db.section.findUnique({
        where: {
            id: sectionId,
            courseId,
            isPublished: true,
        },
    });

    if (!section) {
        return redirect(`/courses/${courseId}/overview`);
    }

    const purchase = await db.purchase.findUnique({
        where: {
            customerId_courseId: {
                customerId: userId,
                courseId,
            },
        },
    });

    let muxData = null;
    let resources: Resource[] = [];

    if (section.isFree || purchase) {
        muxData = await db.muxData.findUnique({
            where: {
                sectionId,
            },
        });
    }

    if (purchase) {
        resources = await db.resource.findMany({
            where: {
                sectionId,
            },
        });
    }

    const progress = await db.progress.findUnique({
        where: {
            studentId_sectionId: {
                studentId: userId,
                sectionId,
            },
        },
    });

    return (
        <SectionsDetails
            course={course}
            section={section}
            purchase={purchase}
            muxData={muxData}
            resources={resources}
            progress={progress}
        />
    );
};

export default SectionDetailsPage;