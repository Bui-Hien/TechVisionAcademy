import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import EditSectionForm from "@/components/sections/EditSectionForm";
import AlertBanner from "@/components/custom/AlertBanner";

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
            instructorId: userId
        },
    })
    if (!course) {
        return redirect(`/instructor/courses`);
    }
    const section = await db.section.findUnique({
        where: {
            id: sectionId,
            courseId,
        },
        include: {
            resources: true,
            muxData: true
        }
    });
    if (!section) {
        return redirect(`/instructor/courses/${params.courseId}/sections`);
    }
    const requiredFields = [section.title, section.description, section.videoUrl];
    const requiredFieldsCount = requiredFields.length;
    const missingField = requiredFields.filter((field) => !Boolean(field));//Hàm filter sẽ duyệt qua từng trường và chỉ giữ lại các trường có giá trị false (ví dụ: null, undefined, 0, '').
    const missingFieldsCount = missingField.length;
    const isCompleted = requiredFields.every(Boolean);//Hàm every sẽ trả về true nếu tất cả các trường đều có giá trị hợp lệ, ngược lại trả về false.
    return (
        <div className="mx-10">
            <AlertBanner isCompleted={isCompleted} requiredFieldsCount={requiredFieldsCount}
                         missingFieldsCount={missingFieldsCount}/>
            <EditSectionForm
                section={section}
                courseId={params.courseId}
                isCompleted={isCompleted}/>
        </div>
    );
};

export default SectionDetailsPage;