"use client"
import {ourFileRouter} from "@/app/api/uploadthing/core";
import {UploadDropzone} from "@/lib/uploadthing";
import toast from "react-hot-toast";
import {cn} from "@/lib/utils";
import Image from "next/image";

interface FileUploadProps {
    value: string;
    onChange: (value: string) => void;
    endpoint: keyof typeof ourFileRouter;
    page: string
}

const FileUpload = ({value, onChange, endpoint, page}: FileUploadProps) => {
    return (
        <div className={`flex ${page === "Edit Section" && value !== "" ? "flex-col" : ""} flex-row gap-2`}>
            {page === "Edit Course" && value !== "" && (
                <Image src={value} alt={"image"} width={500} height={500}
                       className={"w-[280px] h-[200px] object-cover rounded-xl"}/>
            )}
            {page === "Edit Section" && value !== "" && (
                <p className="text-sm font-medium">{value}</p>
            )}
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
                }}
                onUploadError={(error: Error) => {
                    toast.error(error.message);
                }}
                className={"w-[280px] h-[200px] mt-0"}
            />
        </div>

    );
};

export default FileUpload;