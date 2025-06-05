
import { useEffect, useRef } from 'react';
import { Label } from "@/components/ui/label";

// Dynamic import to avoid SSR issues
let ReactQuill: any = null;
if (typeof window !== 'undefined') {
  ReactQuill = require('react-quill').default;
  require('react-quill/dist/quill.snow.css');
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, label, placeholder }: RichTextEditorProps) => {
  const quillRef = useRef<any>(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'link', 'image'
  ];

  if (!ReactQuill) {
    return (
      <div className="space-y-2">
        {label && <Label>{label}</Label>}
        <div className="min-h-[200px] border rounded-md p-3 bg-gray-50 flex items-center justify-center">
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="bg-white border rounded-md">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{ minHeight: '200px' }}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
