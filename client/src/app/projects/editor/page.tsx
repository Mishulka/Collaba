import RichTextEditor from "@/app/widgets/rich-text-editor";

export default function EditorPage() {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="max-w-3xl mx-auto w-full h-full">
                <RichTextEditor/>  
            </div>
        </div>    
    );
}