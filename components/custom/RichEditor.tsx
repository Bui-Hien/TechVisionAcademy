import 'react-quill/dist/quill.snow.css';
import {useMemo} from "react";
import dynamic from "next/dynamic";

interface RichEditorProps {
    placeholder: string;
    onChange: (value: string) => void;
    value?: string;
}

const RichEditor = ({placeholder, onChange, value}: RichEditorProps) => {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), {ssr: false}), []);
    return (
        <ReactQuill
            placeholder={placeholder}
            theme={"snow"}
            value={value}
            onChange={(value) => onChange(value)}/>
    );
};

export default RichEditor;